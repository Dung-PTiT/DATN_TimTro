package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.FavoriteDAO;
import com.ptit.timtro.entity.FavoriteEntity;
import com.ptit.timtro.entity.UserEntity;
import com.ptit.timtro.model.Favorite;
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
    public List<Favorite> getAll() {
        List<FavoriteEntity> favoriteEntities = favoriteDAO.getAll();

        return favoriteEntities.stream().map(favoriteEntity -> {
            Favorite favorite = new Favorite();
            favorite.setId(favoriteEntity.getId());
            favorite.setCreateTime(favoriteEntity.getCreateTime());

            UserEntity userEntity = favoriteEntity.getUserEntity();
            User user = new User();
            user.setId(userEntity.getId());
            user.setName(userEntity.getName());
            user.setImageUrl(userEntity.getImageUrl());
            favorite.setUser(user);

            favorite.setPost(null);
            return favorite;
        }).collect(Collectors.toList());
    }
}
