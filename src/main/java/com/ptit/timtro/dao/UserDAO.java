package com.ptit.timtro.dao;

import com.ptit.timtro.entity.UserEntity;

import java.util.List;

public interface UserDAO {
    UserEntity create(UserEntity userEntity);

    UserEntity get(Integer id);

    List<UserEntity> getAll();

    UserEntity update(UserEntity userEntity);

    void delete(UserEntity userEntity);

    UserEntity getByUsername(String username);

    UserEntity getByEmail(String email);
}
