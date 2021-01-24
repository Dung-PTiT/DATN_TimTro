package com.ptit.timtro.service;

import com.ptit.timtro.entity.PostEntity;
import com.ptit.timtro.model.Post;
import com.ptit.timtro.util.PostRequest;

import java.util.List;

public interface PostService {

    PostEntity create(PostRequest postRequest);

    void update(PostRequest postRequest);

    void delete(Integer id);

    Post getById(Integer id);

    List<PostRequest> getByUserId(Integer id);

    List<PostRequest> getAll();

    void updateStatus(Integer id, Boolean status);

    List<PostRequest> getRecommendPost(double latitude, double longitude, Integer currentPostId);
}
