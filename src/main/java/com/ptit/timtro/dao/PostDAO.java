package com.ptit.timtro.dao;

import com.ptit.timtro.entity.PostEntity;

import java.util.List;

public interface PostDAO {
    PostEntity create(PostEntity postEntity);

    void update(PostEntity postEntity);

    void delete(Integer id);

    PostEntity getById(Integer id);

    List<PostEntity> getByUserId(Integer id);

    List<PostEntity> getAll();

    void updateStatus(Integer id);
}