package com.ptit.timtro.service;

import com.ptit.timtro.entity.UserEntity;
import com.ptit.timtro.model.User;

import java.util.List;

public interface UserService {
    Integer create(User user);

    User get(Integer id);

    List<User> getAll();

    void update(User user);

    void delete(Integer id);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    User checkExistedUser(String email, String typeAuthProvider);

    void changePassword(User user);
}

