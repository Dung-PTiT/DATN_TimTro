package com.ptit.timtro.service;

import com.ptit.timtro.model.Post;

import java.util.List;

public interface PostService {

    void create(Post post);

    List<Post> getAll();
}
