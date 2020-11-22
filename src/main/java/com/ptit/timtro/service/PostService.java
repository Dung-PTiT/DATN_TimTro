package com.ptit.timtro.service;

import com.ptit.timtro.entity.PostEntity;
import com.ptit.timtro.model.Post;

import java.util.List;

public interface PostService {

    PostEntity create(Post post);

    Post getById(Integer id);

    List<Post> getAll();
}
