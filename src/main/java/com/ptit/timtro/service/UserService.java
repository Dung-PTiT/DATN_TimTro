package com.ptit.timtro.service;

import com.ptit.timtro.model.User;

import java.util.List;

public interface UserService {
    Integer create(User user);

    User get(Integer id);

    List<User> getAll();

    void update(User user);

    User getByUsername(String username);

    void updateStatus(User user);

    void updateEmailVerifyCode(User user);

    void delete(Integer id);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    User getByEmailAndTypeProvider(String email, String typeAuthProvider);

    User checkExistedUser(String email, String typeAuthProvider);

    void changePassword(User user);
}

