package com.ptit.timtro.service;

import com.ptit.timtro.model.Favorite;
import io.swagger.models.auth.In;

import java.util.List;

public interface FavoriteService {
    void create(Favorite favorite);

    void delete(Integer id);

    List<Favorite> getByUserId(Integer id);

    Favorite getById(Integer id);

    Favorite getByPostIdUserId(Integer postId, Integer userId);

    boolean checkPostIdUserId(Integer postId, Integer userId);

    List<Favorite> getAll();
}
