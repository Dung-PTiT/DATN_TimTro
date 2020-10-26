package com.ptit.timtro.dao;


import com.ptit.timtro.entity.UserEntity;

public interface UserDAO {
    UserEntity getByUsername(String username);
}
