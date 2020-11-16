package com.ptit.timtro.dao;

import com.ptit.timtro.entity.PostEntity;

import java.util.List;

public interface PostDAO {
    void create(PostEntity postEntity);

    List<PostEntity> getAll();
}
