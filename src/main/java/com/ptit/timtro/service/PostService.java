package com.ptit.timtro.service;

import com.ptit.timtro.entity.PostEntity;
import com.ptit.timtro.model.Post;

import java.util.List;

public interface PostService {

    PostEntity create(Post post);

    void delete(Integer id);

    Post getById(Integer id);

    List<Post> getByUserId(Integer id);

    List<Post> getAll();
}
