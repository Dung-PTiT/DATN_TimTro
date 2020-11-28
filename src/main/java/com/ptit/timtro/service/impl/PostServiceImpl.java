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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
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
        postEntity.setStatus("false");
        postEntity.setLatitude(post.getLatitude());
        postEntity.setLongitude(post.getLongitude());
        try {

            postEntity.setWardEntity(new WardEntity(
                    new ObjectMapper().readValue(post.getWardStr(), Ward.class).getId(),
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
    public Post getById(Integer id) {
        PostEntity postEntity = postDAO.getById(id);
        Post post = new Post();
        post.setId(postEntity.getId());
        post.setTitle(postEntity.getTitle());
        post.setContent(postEntity.getContent());
        post.setPrice(postEntity.getPrice());
        post.setAcreage(postEntity.getAcreage());
        post.setView(postEntity.getView());
        //set address
        WardEntity wardEntity = postEntity.getWardEntity();
        DistrictEntity districtEntity = wardEntity.getDistrictEntity();
        ProvinceEntity provinceEntity = districtEntity.getProvinceEntity();
        String address = postEntity.getAddress() + ", " + wardEntity.getPrefix() + " " + wardEntity.getName()
                + ", " + districtEntity.getPrefix() + " " + districtEntity.getName()
                + ", " + provinceEntity.getName();
        post.setAddress(address);
        //end
        post.setStatus(postEntity.getStatus());
        post.setLatitude(postEntity.getLatitude());
        post.setLongitude(postEntity.getLongitude());

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
        return post;
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
                //set address
                WardEntity wardEntity = postEntity.getWardEntity();
                DistrictEntity districtEntity = wardEntity.getDistrictEntity();
                ProvinceEntity provinceEntity = districtEntity.getProvinceEntity();
                String address = postEntity.getAddress() + ", " + wardEntity.getPrefix() + " " + wardEntity.getName()
                        + ", " + districtEntity.getPrefix() + " " + districtEntity.getName()
                        + ", " + provinceEntity.getName();
                post.setAddress(address);
                //end
                post.setStatus(postEntity.getStatus());
                post.setLatitude(postEntity.getLatitude());
                post.setLongitude(postEntity.getLongitude());

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
}
