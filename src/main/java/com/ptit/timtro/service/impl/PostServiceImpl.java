package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.PostDAO;
import com.ptit.timtro.entity.*;
import com.ptit.timtro.model.*;
import com.ptit.timtro.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PostServiceImpl implements PostService {

    @Autowired
    private PostDAO postDAO;

    @Override
    public void create(Post post) {
        PostEntity postEntity = new PostEntity();

//        private String address;
//        private List<Image> images;
//        private User user;
//        private List<Comment> comments;
//        private Category category;
//        private PostVip postVip;
//        private List<Tag> tags;
//        private MultipartFile[] files;

        postEntity.setTitle(post.getTitle());
        postEntity.setContent(post.getContent());
        postEntity.setCreateDate(post.getCreateDate());
        postEntity.setEndDate(post.getEndDate());
        postEntity.setPrice(post.getPrice());
        postEntity.setAcreage(post.getAcreage());
        postEntity.setView(post.getView());
        postEntity.setDescription(post.getDescription());
        postEntity.setStatus(post.getStatus());
        postEntity.setLatitude(post.getLatitude());
        postEntity.setLongitude(post.getLongitude());
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
                post.setCreateDate(postEntity.getCreateDate());
                post.setEndDate(postEntity.getEndDate());
                post.setPrice(postEntity.getPrice());
                post.setAcreage(postEntity.getAcreage());
                post.setView(postEntity.getView());
                post.setDescription(postEntity.getDescription());
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

                post.setPostVip(new PostVip(
                        postEntity.getPostVipEntity().getId(),
                        postEntity.getPostVipEntity().getName(),
                        postEntity.getPostVipEntity().getPrice(),
                        postEntity.getPostVipEntity().getDescription(),
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
