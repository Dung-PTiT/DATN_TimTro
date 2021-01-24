package com.ptit.timtro.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ptit.timtro.dao.PostDAO;
import com.ptit.timtro.entity.*;
import com.ptit.timtro.model.*;
import com.ptit.timtro.security.AdvancedSecurityContextHolder;
import com.ptit.timtro.service.PostService;
import com.ptit.timtro.util.PostRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PostServiceImpl implements PostService {

    @Autowired
    private PostDAO postDAO;

    @Override
    public PostEntity create(PostRequest postRequest) {
        PostEntity postEntity = new PostEntity();
        postEntity.setTitle(postRequest.getTitle());
        postEntity.setContent(postRequest.getContent());
        postEntity.setPrice(postRequest.getPrice());
        postEntity.setAcreage(postRequest.getAcreage());
        postEntity.setAddress(postRequest.getAddress());
        postEntity.setView(0);
        postEntity.setStatus(false);
        postEntity.setLatitude(postRequest.getLatitude());
        postEntity.setLongitude(postRequest.getLongitude());
        postEntity.setPhoneNumber(postRequest.getPhoneNumber());

        Date date = new Date();
        postEntity.setCreateTime(date);

        try {
            postEntity.setWardEntity(new WardEntity(
                    new ObjectMapper().readValue(postRequest.getWardStr(), Ward.class).getId(),
                    null, null, null, null)
            );

            postEntity.setDistrictEntity(new DistrictEntity(
                    new ObjectMapper().readValue(postRequest.getDistrictStr(), District.class).getId(),
                    null, null, null, null, null)
            );

            postEntity.setProvinceEntity(new ProvinceEntity(
                    new ObjectMapper().readValue(postRequest.getProvinceStr(), Province.class).getId(),
                    null, null, null, null)
            );

            postEntity.setCategoryEntity(new CategoryEntity(
                    new ObjectMapper().readValue(postRequest.getCategoryStr(), Category.class).getId(),
                    null, null, null));

            List<Tag> tags = new ObjectMapper().readValue(postRequest.getTagsStr(), new TypeReference<List<Tag>>() {
            });
            List<TagEntity> tagEntities = new ArrayList<>();
            for (Tag tag : tags) {
                tagEntities.add(new TagEntity(tag.getId(), null, null, null));
            }
            postEntity.setTags(tagEntities);

            UserEntity userEntity = new UserEntity();
            userEntity.setId(AdvancedSecurityContextHolder.getUserPrincipal().getId());
            postEntity.setUserEntity(userEntity);

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return postDAO.create(postEntity);
    }

    @Override
    public void update(PostRequest postRequest) {
        PostEntity postEntity = postDAO.getById(postRequest.getId());
        postEntity.setTitle(postRequest.getTitle());
        postEntity.setContent(postRequest.getContent());
        postEntity.setPrice(postRequest.getPrice());
        postEntity.setAcreage(postRequest.getAcreage());
        postEntity.setAddress(postRequest.getAddress());
        postEntity.setLatitude(postRequest.getLatitude());
        postEntity.setLongitude(postRequest.getLongitude());
        postEntity.setPhoneNumber(postRequest.getPhoneNumber());

        try {
            postEntity.setWardEntity(new WardEntity(
                    new ObjectMapper().readValue(postRequest.getWardStr(), Ward.class).getId(),
                    null, null, null, null)
            );

            postEntity.setDistrictEntity(new DistrictEntity(
                    new ObjectMapper().readValue(postRequest.getDistrictStr(), District.class).getId(),
                    null, null, null, null, null)
            );

            postEntity.setProvinceEntity(new ProvinceEntity(
                    new ObjectMapper().readValue(postRequest.getProvinceStr(), Province.class).getId(),
                    null, null, null, null)
            );

            postEntity.setCategoryEntity(new CategoryEntity(
                    new ObjectMapper().readValue(postRequest.getCategoryStr(), Category.class).getId(),
                    null, null, null));

            List<Tag> tags = new ObjectMapper().readValue(postRequest.getTagsStr(), new TypeReference<List<Tag>>() {
            });
            List<TagEntity> tagEntities = new ArrayList<>();
            for (Tag tag : tags) {
                tagEntities.add(new TagEntity(tag.getId(), null, null, null));
            }
            postEntity.setTags(tagEntities);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void delete(Integer id) {
        postDAO.delete(id);
    }

    @Override
    public Post getById(Integer id) {
        PostEntity postEntity = postDAO.getById(id);
        PostRequest postRequest = new PostRequest();
        postRequest.setId(postEntity.getId());
        postRequest.setTitle(postEntity.getTitle());
        postRequest.setContent(postEntity.getContent());
        postRequest.setPrice(postEntity.getPrice());
        postRequest.setAcreage(postEntity.getAcreage());
        postRequest.setView(postEntity.getView());
        postRequest.setAddress(postEntity.getAddress());
        postRequest.setStatus(postEntity.getStatus());
        postRequest.setLatitude(postEntity.getLatitude());
        postRequest.setLongitude(postEntity.getLongitude());
        postRequest.setCreateTime(postEntity.getCreateTime());
        postRequest.setPhoneNumber(postEntity.getPhoneNumber());

        WardEntity wardEntity = postEntity.getWardEntity();
        Ward ward = new Ward();
        ward.setId(wardEntity.getId());
        ward.setPrefix(wardEntity.getPrefix());
        ward.setName(wardEntity.getName());
        postRequest.setWard(ward);

        DistrictEntity districtEntity = postEntity.getDistrictEntity();
        District district = new District();
        district.setId(districtEntity.getId());
        district.setPrefix(districtEntity.getPrefix());
        district.setName(districtEntity.getName());
        postRequest.setDistrict(district);

        ProvinceEntity provinceEntity = postEntity.getProvinceEntity();
        Province province = new Province();
        province.setId(provinceEntity.getId());
        province.setCode(provinceEntity.getCode());
        province.setName(provinceEntity.getName());
        postRequest.setProvince(province);

        postRequest.setCategory(
                new Category(postEntity.getCategoryEntity().getId(), postEntity.getCategoryEntity().getName(),
                        postEntity.getCategoryEntity().getDescription())
        );

        postRequest.setTags(postEntity.getTags().stream().map(
                tagEntity ->
                        new Tag(tagEntity.getId(), tagEntity.getName(), tagEntity.getDescription()))
                .collect(Collectors.toList()));

        postRequest.setImages(postEntity.getImages().stream().map(
                imageEntity ->
                        new Image(imageEntity.getId(), imageEntity.getImageUrl()))
                .collect(Collectors.toList()));

        UserEntity userEntity = postEntity.getUserEntity();
        User user = new User();
        user.setId(userEntity.getId());
        user.setName(userEntity.getName());
        user.setEmail(userEntity.getEmail());
        user.setPhoneNumber(userEntity.getPhoneNumber());
        user.setImageUrl(userEntity.getImageUrl());
        postRequest.setUser(user);

        List<CommentEntity> commentEntities = postEntity.getComments();
        postRequest.setComments(commentEntities.stream().map(
                commentEntity -> {
                    Comment comment = new Comment();
                    comment.setId(commentEntity.getId());
                    comment.setContent(commentEntity.getContent());
                    comment.setCreateTime(commentEntity.getCreateTime());

                    UserEntity userEntityComment = commentEntity.getUserEntity();
                    User userComment = new User();
                    userComment.setId(userEntityComment.getId());
                    userComment.setName(userEntityComment.getName());
                    userComment.setImageUrl(userEntityComment.getImageUrl());
                    comment.setUser(userComment);

                    comment.setPost(null);
                    return comment;
                }
        ).collect(Collectors.toList()));

        List<FavoriteEntity> favoriteEntities = postEntity.getFavorites();
        postRequest.setFavorites(favoriteEntities.stream().map(favoriteEntity -> {
            Favorite favorite = new Favorite();
            favorite.setId(favoriteEntity.getId());
            favorite.setCreateTime(favoriteEntity.getCreateTime());

            User user1 = new User();
            user1.setId(favoriteEntity.getUserEntity().getId());
            favorite.setUser(user1);

            favorite.setPost(null);
            return favorite;
        }).collect(Collectors.toList()));

        postRequest.setPayments(postEntity.getPayments().stream().map(paymentEntity -> {
            Payment payment = new Payment();
            payment.setId(paymentEntity.getId());
            payment.setDescription(paymentEntity.getDescription());
            payment.setStartDate(paymentEntity.getStartDate());
            payment.setEndDate(paymentEntity.getEndDate());
            payment.setPrice(paymentEntity.getPrice());
            payment.setStatus(paymentEntity.getStatus());

            PostVipEntity postVipEntity = paymentEntity.getPostVipEntity();
            PostVip postVip = new PostVip();
            postVip.setId(postVipEntity.getId());
            postVip.setName(postVipEntity.getName());
            postVip.setVipLevel(postVipEntity.getViplevel());
            postVip.setDescription(postVipEntity.getDescription());
            postVip.setDayPrice(postVipEntity.getDayPrice());
            postVip.setWeekPrice(postVipEntity.getWeekPrice());
            postVip.setMonthPrice(postVipEntity.getMonthPrice());

            payment.setPostVip(postVip);

            return payment;
        }).collect(Collectors.toList()));
        return postRequest;
    }

    @Override
    public List<PostRequest> getByUserId(Integer id) {
        List<PostEntity> postEntities = postDAO.getByUserId(id);
        if (postEntities != null) {
            return postEntities.stream().map(postEntity ->
            {
                PostRequest postRequest = new PostRequest();
                postRequest.setId(postEntity.getId());
                postRequest.setTitle(postEntity.getTitle());
                postRequest.setContent(postEntity.getContent());
                postRequest.setPrice(postEntity.getPrice());
                postRequest.setAcreage(postEntity.getAcreage());
                postRequest.setView(postEntity.getView());
                postRequest.setAddress(postEntity.getAddress());
                postRequest.setStatus(postEntity.getStatus());
                postRequest.setLatitude(postEntity.getLatitude());
                postRequest.setLongitude(postEntity.getLongitude());
                postRequest.setCreateTime(postEntity.getCreateTime());
                postRequest.setPhoneNumber(postEntity.getPhoneNumber());

                WardEntity wardEntity = postEntity.getWardEntity();
                Ward ward = new Ward();
                ward.setId(wardEntity.getId());
                ward.setPrefix(wardEntity.getPrefix());
                ward.setName(wardEntity.getName());
                postRequest.setWard(ward);

                DistrictEntity districtEntity = postEntity.getDistrictEntity();
                District district = new District();
                district.setId(districtEntity.getId());
                district.setPrefix(districtEntity.getPrefix());
                district.setName(districtEntity.getName());
                postRequest.setDistrict(district);

                ProvinceEntity provinceEntity = postEntity.getProvinceEntity();
                Province province = new Province();
                province.setId(provinceEntity.getId());
                province.setCode(provinceEntity.getCode());
                province.setName(provinceEntity.getName());
                postRequest.setProvince(province);

                postRequest.setCategory(new Category(
                        postEntity.getCategoryEntity().getId(),
                        postEntity.getCategoryEntity().getName(),
                        postEntity.getCategoryEntity().getDescription()
                ));

                postRequest.setTags(postEntity.getTags().stream().map(tagEntity ->
                        new Tag(tagEntity.getId(),
                                tagEntity.getName(),
                                tagEntity.getDescription()))
                        .collect(Collectors.toList()));

                postRequest.setImages(postEntity.getImages().stream().map(imageEntity ->
                        new Image(imageEntity.getId(),
                                imageEntity.getImageUrl())).collect(Collectors.toList()));

                postRequest.setFavorites(postEntity.getFavorites().stream().map(favoriteEntity -> {
                    Favorite favorite = new Favorite();
                    favorite.setId(favoriteEntity.getId());
                    favorite.setCreateTime(favoriteEntity.getCreateTime());

                    UserEntity userEntity = favoriteEntity.getUserEntity();
                    User user = new User();
                    user.setId(userEntity.getId());
                    user.setName(userEntity.getName());
                    user.setEmail(userEntity.getEmail());
                    user.setPhoneNumber(userEntity.getPhoneNumber());
                    favorite.setUser(user);

                    favorite.setPost(null);

                    return favorite;
                }).collect(Collectors.toList()));

                postRequest.setComments(postEntity.getComments().stream().map(commentEntity ->
                        new Comment(commentEntity.getId(),
                                commentEntity.getContent(),
                                commentEntity.getCreateTime(),
                                null, null)
                ).collect(Collectors.toList()));

                postRequest.setPayments(postEntity.getPayments().stream().map(paymentEntity -> {
                    Payment payment = new Payment();
                    payment.setId(paymentEntity.getId());
                    payment.setDescription(paymentEntity.getDescription());
                    payment.setStartDate(paymentEntity.getStartDate());
                    payment.setEndDate(paymentEntity.getEndDate());
                    payment.setPrice(paymentEntity.getPrice());
                    payment.setStatus(paymentEntity.getStatus());

                    PostVipEntity postVipEntity = paymentEntity.getPostVipEntity();
                    PostVip postVip = new PostVip();
                    postVip.setId(postVipEntity.getId());
                    postVip.setName(postVipEntity.getName());
                    postVip.setVipLevel(postVipEntity.getViplevel());
                    postVip.setDescription(postVipEntity.getDescription());
                    postVip.setDayPrice(postVipEntity.getDayPrice());
                    postVip.setWeekPrice(postVipEntity.getWeekPrice());
                    postVip.setMonthPrice(postVipEntity.getMonthPrice());

                    payment.setPostVip(postVip);

                    return payment;
                }).collect(Collectors.toList()));
                return postRequest;
            }).collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public List<PostRequest> getAll() {
        List<PostEntity> postEntities = postDAO.getAll();
        if (postEntities != null) {
            return postEntities.stream().map(postEntity ->
            {
                PostRequest postRequest = new PostRequest();
                postRequest.setId(postEntity.getId());
                postRequest.setTitle(postEntity.getTitle());
                postRequest.setContent(postEntity.getContent());
                postRequest.setPrice(postEntity.getPrice());
                postRequest.setAcreage(postEntity.getAcreage());
                postRequest.setView(postEntity.getView());
                postRequest.setAddress(postEntity.getAddress());
                postRequest.setStatus(postEntity.getStatus());
                postRequest.setLatitude(postEntity.getLatitude());
                postRequest.setLongitude(postEntity.getLongitude());
                postRequest.setCreateTime(postEntity.getCreateTime());
                postRequest.setPhoneNumber(postEntity.getPhoneNumber());

                WardEntity wardEntity = postEntity.getWardEntity();
                Ward ward = new Ward();
                ward.setId(wardEntity.getId());
                ward.setPrefix(wardEntity.getPrefix());
                ward.setName(wardEntity.getName());
                postRequest.setWard(ward);

                DistrictEntity districtEntity = postEntity.getDistrictEntity();
                District district = new District();
                district.setId(districtEntity.getId());
                district.setPrefix(districtEntity.getPrefix());
                district.setName(districtEntity.getName());
                postRequest.setDistrict(district);

                ProvinceEntity provinceEntity = postEntity.getProvinceEntity();
                Province province = new Province();
                province.setId(provinceEntity.getId());
                province.setCode(provinceEntity.getCode());
                province.setName(provinceEntity.getName());
                postRequest.setProvince(province);

                postRequest.setCategory(new Category(
                        postEntity.getCategoryEntity().getId(),
                        postEntity.getCategoryEntity().getName(),
                        postEntity.getCategoryEntity().getDescription()
                ));

                postRequest.setTags(postEntity.getTags().stream().map(tagEntity ->
                        new Tag(tagEntity.getId(),
                                tagEntity.getName(),
                                tagEntity.getDescription()))
                        .collect(Collectors.toList()));

                postRequest.setImages(postEntity.getImages().stream().map(imageEntity ->
                        new Image(imageEntity.getId(),
                                imageEntity.getImageUrl())).collect(Collectors.toList()));
                return postRequest;
            }).collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public void updateStatus(Integer id, Boolean status) {
        postDAO.updateStatus(id, status);
    }

    @Override
    public List<PostRequest> getRecommendPost(double latitude, double longitude, Integer currentPostId) {
        List<PostEntity> postEntities = postDAO.getRecommendPost(latitude, longitude, currentPostId);
        if (postEntities != null) {
            return postEntities.stream().map(postEntity ->
            {
                PostRequest postRequest = new PostRequest();
                postRequest.setId(postEntity.getId());
                postRequest.setTitle(postEntity.getTitle());
                postRequest.setPrice(postEntity.getPrice());
                postRequest.setAcreage(postEntity.getAcreage());
                postRequest.setAddress(postEntity.getAddress());

                postRequest.setCategory(new Category(
                        postEntity.getCategoryEntity().getId(),
                        postEntity.getCategoryEntity().getName(),
                        postEntity.getCategoryEntity().getDescription()
                ));
                return postRequest;
            }).collect(Collectors.toList());
        }
        return null;
    }
}
