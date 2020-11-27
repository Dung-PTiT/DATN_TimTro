package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.UserDAO;
import com.ptit.timtro.entity.UserEntity;
import com.ptit.timtro.model.User;
import com.ptit.timtro.security.Role;
import com.ptit.timtro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void create(User user) {
        UserEntity userEntity = new UserEntity();
        userEntity.setName(user.getName());
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        userEntity.setUsername(user.getUsername());
        userEntity.setAuthProvider(user.getAuthProvider());
        userEntity.setRole(Role.MEMBER);
        userEntity.setCreateTime(user.getCreateTime());
        userDAO.create(userEntity);
    }

    @Override
    public User get(Integer id) {
        UserEntity userEntity = userDAO.get(id);
        User user = new User();
        user.setId(userEntity.getId());
        user.setName(userEntity.getName());
        user.setEmail(userEntity.getEmail());
        user.setRole(userEntity.getRole().getAuthorityName());
        user.setCreateTime(userEntity.getCreateTime());
        return user;
    }

    @Override
    public List<User> getAll() {
        List<UserEntity> userEntities = userDAO.getAll();
        if (userEntities == null) {
            return null;
        }
        return userEntities.stream().map(userEntity -> {
            User user = new User();
            user.setId(userEntity.getId());
            user.setName(userEntity.getName());
            user.setEmail(userEntity.getEmail());
            user.setCreateTime(userEntity.getCreateTime());
            return user;
        }).collect(Collectors.toList());
    }

    @Override
    public void update(User user) {
        UserEntity userEntity = userDAO.get(user.getId());
        userEntity.setName(user.getName());
        userDAO.update(userEntity);
    }

    @Override
    public void delete(Integer id) {
        UserEntity userEntity = userDAO.get(id);
        userDAO.delete(userEntity);
    }

    @Override
    public boolean existsByEmail(String email) {
        UserEntity userEntity = userDAO.getByEmail(email);
        return userEntity != null;
    }

    @Override
    public boolean existsByUsername(String username) {
        UserEntity userEntity = userDAO.getByUsername(username);
        return userEntity != null;
    }
}
