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

                return post;
            }).collect(Collectors.toList());
        }
        return null;
    }
}
