package com.ptit.timtro.dao;

import com.ptit.timtro.entity.FavoriteEntity;

import java.util.List;

public interface FavoriteDAO {
    void create(FavoriteEntity favoriteEntity);

    void delete(Integer integer);

    FavoriteEntity getById(Integer id);

    List<FavoriteEntity> getByUserId(Integer id);

    List<FavoriteEntity> getAll();

    FavoriteEntity getByPostIdUserId(Integer postId, Integer userId);

    boolean checkPostIdUserId(Integer postId, Integer userId);
}
