package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.FavoriteDAO;
import com.ptit.timtro.entity.FavoriteEntity;
import com.ptit.timtro.entity.PostEntity;
import com.ptit.timtro.entity.UserEntity;
import com.ptit.timtro.model.Favorite;
import com.ptit.timtro.model.Post;
import com.ptit.timtro.model.User;
import com.ptit.timtro.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private FavoriteDAO favoriteDAO;

    @Override
    public void create(Favorite favorite) {
        FavoriteEntity favoriteEntity = new FavoriteEntity();
        favoriteEntity.setCreateTime(favorite.getCreateTime());

        UserEntity userEntity = new UserEntity();
        userEntity.setId(favorite.getUser().getId());
        favoriteEntity.setUserEntity(userEntity);

        PostEntity postEntity = new PostEntity();
        postEntity.setId(favorite.getPost().getId());
        favoriteEntity.setPostEntity(postEntity);

        favoriteDAO.create(favoriteEntity);
    }

    @Override
    public void delete(Integer id) {
        favoriteDAO.delete(id);
    }

    @Override
    public List<Favorite> getByUserId(Integer id) {
        List<FavoriteEntity> favoriteEntities = favoriteDAO.getByUserId(id);
        return favoriteEntities.stream().map(favoriteEntity -> {
            Favorite favorite = new Favorite();
            favorite.setId(favoriteEntity.getId());
            favorite.setCreateTime(favoriteEntity.getCreateTime());

            PostEntity postEntity = favoriteEntity.getPostEntity();
            Post post = new Post();
            post.setId(postEntity.getId());
            favorite.setPost(post);

            return favorite;
        }).collect(Collectors.toList());
    }

    @Override
    public Favorite getById(Integer id) {
        FavoriteEntity favoriteEntity = favoriteDAO.getById(id);
        return enityToModel(favoriteEntity);
    }

    @Override
    public Favorite getByPostIdUserId(Integer postId, Integer userId) {
        FavoriteEntity favoriteEntity = favoriteDAO.getByPostIdUserId(postId, userId);
        return enityToModel(favoriteEntity);
    }

    @Override
    public boolean checkPostIdUserId(Integer postId, Integer userId) {
        return favoriteDAO.checkPostIdUserId(postId, userId);
    }

    @Override
    public List<Favorite> getAll() {
        List<FavoriteEntity> favoriteEntities = favoriteDAO.getAll();
        return favoriteEntities.stream().map(this::enityToModel).collect(Collectors.toList());
    }

    private Favorite enityToModel(FavoriteEntity favoriteEntity) {
        Favorite favorite = new Favorite();
        favorite.setId(favoriteEntity.getId());
        favorite.setCreateTime(favoriteEntity.getCreateTime());

        UserEntity userEntity = favoriteEntity.getUserEntity();
        User user = new User();
        user.setId(userEntity.getId());
        user.setName(userEntity.getName());
        user.setImageUrl(userEntity.getImageUrl());
        favorite.setUser(user);

        PostEntity postEntity = favoriteEntity.getPostEntity();
        Post post = new Post();
        post.setId(postEntity.getId());
        favorite.setPost(post);

        return favorite;
    }
}
