package com.ptit.timtro.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ptit.timtro.dao.PostDAO;
import com.ptit.timtro.entity.*;
import com.ptit.timtro.model.*;
import com.ptit.timtro.security.AdvancedSecurityContextHolder;
import com.ptit.timtro.security.UserPrincipal;
import com.ptit.timtro.service.PostService;
import com.ptit.timtro.util.FileDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    public PostEntity create(Post post) {
        PostEntity postEntity = new PostEntity();
        postEntity.setTitle(post.getTitle());
        postEntity.setContent(post.getContent());
        postEntity.setPrice(post.getPrice());
        postEntity.setAcreage(post.getAcreage());
        postEntity.setAddress(post.getAddress());
        postEntity.setView(0);
        postEntity.setStatus(false);
        postEntity.setLatitude(post.getLatitude());
        postEntity.setLongitude(post.getLongitude());
        postEntity.setPhoneNumber(post.getPhoneNumber());

        Date date = new Date();
        postEntity.setCreateTime(date);

        try {
            postEntity.setWardEntity(new WardEntity(
                    new ObjectMapper().readValue(post.getWardStr(), Ward.class).getId(),
                    null, null, null, null)
            );

            postEntity.setDistrictEntity(new DistrictEntity(
                    new ObjectMapper().readValue(post.getDistrictStr(), District.class).getId(),
                    null, null, null, null, null)
            );

            postEntity.setProvinceEntity(new ProvinceEntity(
                    new ObjectMapper().readValue(post.getProvinceStr(), Province.class).getId(),
                    null, null, null, null)
            );

            postEntity.setCategoryEntity(new CategoryEntity(
                    new ObjectMapper().readValue(post.getCategoryStr(), Category.class).getId(),
                    null, null, null));

            List<Tag> tags = new ObjectMapper().readValue(post.getTagsStr(), new TypeReference<List<Tag>>() {
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
    public void update(Post post) {
        PostEntity postEntity = postDAO.getById(post.getId());
        postEntity.setTitle(post.getTitle());
        postEntity.setContent(post.getContent());
        postEntity.setPrice(post.getPrice());
        postEntity.setAcreage(post.getAcreage());
        postEntity.setAddress(post.getAddress());
        postEntity.setLatitude(post.getLatitude());
        postEntity.setLongitude(post.getLongitude());
        postEntity.setPhoneNumber(post.getPhoneNumber());

        try {
            postEntity.setWardEntity(new WardEntity(
                    new ObjectMapper().readValue(post.getWardStr(), Ward.class).getId(),
                    null, null, null, null)
            );

            postEntity.setDistrictEntity(new DistrictEntity(
                    new ObjectMapper().readValue(post.getDistrictStr(), District.class).getId(),
                    null, null, null, null, null)
            );

            postEntity.setProvinceEntity(new ProvinceEntity(
                    new ObjectMapper().readValue(post.getProvinceStr(), Province.class).getId(),
                    null, null, null, null)
            );

            postEntity.setCategoryEntity(new CategoryEntity(
                    new ObjectMapper().readValue(post.getCategoryStr(), Category.class).getId(),
                    null, null, null));

            List<Tag> tags = new ObjectMapper().readValue(post.getTagsStr(), new TypeReference<List<Tag>>() {
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
        Post post = new Post();
        post.setId(postEntity.getId());
        post.setTitle(postEntity.getTitle());
        post.setContent(postEntity.getContent());
        post.setPrice(postEntity.getPrice());
        post.setAcreage(postEntity.getAcreage());
        post.setView(postEntity.getView());
        post.setAddress(postEntity.getAddress());
        post.setStatus(postEntity.getStatus());
        post.setLatitude(postEntity.getLatitude());
        post.setLongitude(postEntity.getLongitude());
        post.setCreateTime(postEntity.getCreateTime());
        post.setPhoneNumber(postEntity.getPhoneNumber());

        WardEntity wardEntity = postEntity.getWardEntity();
        Ward ward = new Ward();
        ward.setId(wardEntity.getId());
        ward.setPrefix(wardEntity.getPrefix());
        ward.setName(wardEntity.getName());
        post.setWard(ward);

        DistrictEntity districtEntity = postEntity.getDistrictEntity();
        District district = new District();
        district.setId(districtEntity.getId());
        district.setPrefix(districtEntity.getPrefix());
        district.setName(districtEntity.getName());
        post.setDistrict(district);

        ProvinceEntity provinceEntity = postEntity.getProvinceEntity();
        Province province = new Province();
        province.setId(provinceEntity.getId());
        province.setCode(provinceEntity.getCode());
        province.setName(provinceEntity.getName());
        post.setProvince(province);

        post.setCategory(
                new Category(postEntity.getCategoryEntity().getId(), postEntity.getCategoryEntity().getName(),
                        postEntity.getCategoryEntity().getDescription(), null)
        );

        post.setTags(postEntity.getTags().stream().map(
                tagEntity ->
                        new Tag(tagEntity.getId(), tagEntity.getName(), tagEntity.getDescription(), null))
                .collect(Collectors.toList()));

        post.setImages(postEntity.getImages().stream().map(
                imageEntity ->
                        new Image(imageEntity.getId(), imageEntity.getImageUrl(), null))
                .collect(Collectors.toList()));

        UserEntity userEntity = postEntity.getUserEntity();
        User user = new User();
        user.setId(userEntity.getId());
        user.setName(userEntity.getName());
        user.setEmail(userEntity.getEmail());
        user.setPhoneNumber(userEntity.getPhoneNumber());
        user.setImageUrl(userEntity.getImageUrl());
        post.setUser(user);

        List<CommentEntity> commentEntities = postEntity.getComments();
        post.setComments(commentEntities.stream().map(
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
        post.setFavorites(favoriteEntities.stream().map(favoriteEntity -> {
            Favorite favorite = new Favorite();
            favorite.setId(favoriteEntity.getId());
            favorite.setCreateTime(favoriteEntity.getCreateTime());

            User user1 = new User();
            user1.setId(favoriteEntity.getUserEntity().getId());
            favorite.setUser(user1);

            favorite.setPost(null);
            return favorite;
        }).collect(Collectors.toList()));

        post.setPayments(postEntity.getPayments().stream().map(paymentEntity -> {
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
        return post;
    }

    @Override
    public List<Post> getByUserId(Integer id) {
        List<PostEntity> postEntities = postDAO.getByUserId(id);
        if (postEntities != null) {
            return postEntities.stream().map(postEntity ->
            {
                Post post = new Post();
                post.setId(postEntity.getId());
                post.setTitle(postEntity.getTitle());
                post.setContent(postEntity.getContent());
                post.setPrice(postEntity.getPrice());
                post.setAcreage(postEntity.getAcreage());
                post.setView(postEntity.getView());
                post.setAddress(postEntity.getAddress());
                post.setStatus(postEntity.getStatus());
                post.setLatitude(postEntity.getLatitude());
                post.setLongitude(postEntity.getLongitude());
                post.setCreateTime(postEntity.getCreateTime());
                post.setPhoneNumber(postEntity.getPhoneNumber());

                WardEntity wardEntity = postEntity.getWardEntity();
                Ward ward = new Ward();
                ward.setId(wardEntity.getId());
                ward.setPrefix(wardEntity.getPrefix());
                ward.setName(wardEntity.getName());
                post.setWard(ward);

                DistrictEntity districtEntity = postEntity.getDistrictEntity();
                District district = new District();
                district.setId(districtEntity.getId());
                district.setPrefix(districtEntity.getPrefix());
                district.setName(districtEntity.getName());
                post.setDistrict(district);

                ProvinceEntity provinceEntity = postEntity.getProvinceEntity();
                Province province = new Province();
                province.setId(provinceEntity.getId());
                province.setCode(provinceEntity.getCode());
                province.setName(provinceEntity.getName());
                post.setProvince(province);

                post.setCategory(new Category(
                        postEntity.getCategoryEntity().getId(),
                        postEntity.getCategoryEntity().getName(),
                        postEntity.getCategoryEntity().getDescription(),
                        null
                ));

                post.setTags(postEntity.getTags().stream().map(tagEntity ->
                        new Tag(tagEntity.getId(),
                                tagEntity.getName(),
                                tagEntity.getDescription(),
                                null))
                        .collect(Collectors.toList()));

                post.setImages(postEntity.getImages().stream().map(imageEntity ->
                        new Image(imageEntity.getId(),
                                imageEntity.getImageUrl(),
                                null)).collect(Collectors.toList()));

                post.setFavorites(postEntity.getFavorites().stream().map(favoriteEntity -> {
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

                post.setComments(postEntity.getComments().stream().map(commentEntity ->
                        new Comment(commentEntity.getId(),
                                commentEntity.getContent(),
                                commentEntity.getCreateTime(),
                                null, null)
                ).collect(Collectors.toList()));

                post.setPayments(postEntity.getPayments().stream().map(paymentEntity -> {
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
                return post;
            }).collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public List<Post> getAll() {
        List<PostEntity> postEntities = postDAO.getAll();
        if (postEntities != null) {
            return postEntities.stream().map(postEntity ->
            {
                Post post = new Post();
                post.setId(postEntity.getId());
                post.setTitle(postEntity.getTitle());
                post.setContent(postEntity.getContent());
                post.setPrice(postEntity.getPrice());
                post.setAcreage(postEntity.getAcreage());
                post.setView(postEntity.getView());
                post.setAddress(postEntity.getAddress());
                post.setStatus(postEntity.getStatus());
                post.setLatitude(postEntity.getLatitude());
                post.setLongitude(postEntity.getLongitude());
                post.setCreateTime(postEntity.getCreateTime());
                post.setPhoneNumber(postEntity.getPhoneNumber());

                WardEntity wardEntity = postEntity.getWardEntity();
                Ward ward = new Ward();
                ward.setId(wardEntity.getId());
                ward.setPrefix(wardEntity.getPrefix());
                ward.setName(wardEntity.getName());
                post.setWard(ward);

                DistrictEntity districtEntity = postEntity.getDistrictEntity();
                District district = new District();
                district.setId(districtEntity.getId());
                district.setPrefix(districtEntity.getPrefix());
                district.setName(districtEntity.getName());
                post.setDistrict(district);

                ProvinceEntity provinceEntity = postEntity.getProvinceEntity();
                Province province = new Province();
                province.setId(provinceEntity.getId());
                province.setCode(provinceEntity.getCode());
                province.setName(provinceEntity.getName());
                post.setProvince(province);

                post.setCategory(new Category(
                        postEntity.getCategoryEntity().getId(),
                        postEntity.getCategoryEntity().getName(),
                        postEntity.getCategoryEntity().getDescription(),
                        null
                ));

                post.setTags(postEntity.getTags().stream().map(tagEntity ->
                        new Tag(tagEntity.getId(),
                                tagEntity.getName(),
                                tagEntity.getDescription(),
                                null))
                        .collect(Collectors.toList()));

                post.setImages(postEntity.getImages().stream().map(imageEntity ->
                        new Image(imageEntity.getId(),
                                imageEntity.getImageUrl(),
                                null)).collect(Collectors.toList()));
                return post;
            }).collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public void updateStatus(Integer id) {
        postDAO.updateStatus(id);
    }
}
