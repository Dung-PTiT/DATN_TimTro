package com.ptit.timtro.dao;

import com.ptit.timtro.entity.UserEntity;

import java.util.List;

public interface UserDAO {
    UserEntity create(UserEntity userEntity);

    UserEntity get(Integer id);

    List<UserEntity> getAll();

    UserEntity update(UserEntity userEntity);

    void delete(UserEntity userEntity);

    void updateStatus(UserEntity userEntity);

    UserEntity getByUsername(String username);

    UserEntity getByEmailAndTypeProvider(String email, String typeAuthProvider);

    UserEntity getByEmail(String email);

    UserEntity checkExistedUser(String email, String typeAuthProvider);

    void changePassword(UserEntity userEntity);
}
