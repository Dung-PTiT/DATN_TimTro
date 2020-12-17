package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.UserDAO;
import com.ptit.timtro.entity.UserEntity;
import com.ptit.timtro.entity.WalletEntity;
import com.ptit.timtro.model.User;
import com.ptit.timtro.model.Wallet;
import com.ptit.timtro.security.Role;
import com.ptit.timtro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Integer create(User user) {
        UserEntity userEntity = new UserEntity();
        userEntity.setName(user.getName());
        userEntity.setEmail(user.getEmail());
        userEntity.setEmailVerifiedCode(user.getEmailVerifyCode());
        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        userEntity.setUsername(user.getUsername());
        userEntity.setAuthProvider(user.getAuthProvider());
        userEntity.setEmailVerified(user.getIsActived());
        if (user.getRole().equals("ROLE_MEMBER")) {
            userEntity.setRole(Role.MEMBER);
        } else if (user.getRole().equals("ROLE_ADMIN")) {
            userEntity.setRole(Role.ADMIN);
        }
        userEntity.setCreateTime(user.getCreateTime());
        userEntity.setPhoneNumber(user.getPhoneNumber());
        return userDAO.create(userEntity).getId();
    }

    @Override
    public User get(Integer id) {
        return entityToModel(userDAO.get(id));
    }

    @Override
    public List<User> getAll() {
        List<UserEntity> userEntities = userDAO.getAll();
        if (userEntities == null) {
            return null;
        }
        return userEntities.stream().map(this::entityToModel).collect(Collectors.toList());
    }

    @Override
    public void update(User user) {
        UserEntity userEntity = userDAO.get(user.getId());
        userEntity.setName(user.getName());
        userDAO.update(userEntity);
    }

    @Override
    public User getByUsername(String username) {
        UserEntity userEntity = userDAO.getByUsername(username);
        User user = new User();
        user.setId(userEntity.getId());
        user.setName(userEntity.getName());
        user.setEmail(userEntity.getEmail());
        user.setUsername(userEntity.getUsername());
        user.setRole(userEntity.getRole().getAuthorityName());
        user.setCreateTime(userEntity.getCreateTime());
        user.setPhoneNumber(userEntity.getPhoneNumber());
        user.setImageUrl(userEntity.getImageUrl());
        user.setIsActived(userEntity.getEmailVerified());
        user.setEmailVerifyCode(userEntity.getEmailVerifiedCode());

        WalletEntity walletEntity = userEntity.getWalletEntity();
        Wallet wallet = new Wallet();
        wallet.setBalance(walletEntity.getBalance());
        wallet.setCreateTime(walletEntity.getCreateTime());
        user.setWallet(wallet);
        return user;
    }

    @Override
    public void updateStatus(User user) {
        UserEntity userEntity = userDAO.get(user.getId());
        userEntity.setEmailVerified(user.getIsActived());
        userDAO.update(userEntity);
    }

    @Override
    public void updateEmailVerifyCode(User user) {
        UserEntity userEntity = userDAO.get(user.getId());
        userEntity.setEmailVerifiedCode(user.getEmailVerifyCode());
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

    @Override
    public User getByEmailAndTypeProvider(String email, String typeAuthProvider) {
        UserEntity userEntity = userDAO.getByEmailAndTypeProvider(email, typeAuthProvider);
        User user = new User();
        user.setId(userEntity.getId());
        user.setName(userEntity.getName());
        user.setEmail(userEntity.getEmail());
        user.setUsername(userEntity.getUsername());
        user.setRole(userEntity.getRole().getAuthorityName());
        user.setCreateTime(userEntity.getCreateTime());
        user.setPhoneNumber(userEntity.getPhoneNumber());
        user.setImageUrl(userEntity.getImageUrl());
        user.setIsActived(userEntity.getEmailVerified());
        user.setEmailVerifyCode(userEntity.getEmailVerifiedCode());

        WalletEntity walletEntity = userEntity.getWalletEntity();
        Wallet wallet = new Wallet();
        wallet.setBalance(walletEntity.getBalance());
        wallet.setCreateTime(walletEntity.getCreateTime());
        user.setWallet(wallet);
        return user;
    }

    @Override
    public User checkExistedUser(String email, String typeAuthProvider) {
        UserEntity userEntity = userDAO.checkExistedUser(email, typeAuthProvider);
        if (userEntity != null) {
            return entityToModel(userEntity);
        }
        return null;
    }

    @Override
    public void changePassword(User user) {
        UserEntity userEntity = userDAO.get(user.getId());
        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        userDAO.changePassword(userEntity);
    }

    private User entityToModel(UserEntity userEntity) {
        User user = new User();
        user.setId(userEntity.getId());
        user.setName(userEntity.getName());
        user.setEmail(userEntity.getEmail());
        user.setRole(userEntity.getRole().getAuthorityName());
        user.setCreateTime(userEntity.getCreateTime());
        user.setPhoneNumber(userEntity.getPhoneNumber());
        user.setImageUrl(userEntity.getImageUrl());
        user.setIsActived(userEntity.getEmailVerified());
        user.setAuthProvider(userEntity.getAuthProvider());

        WalletEntity walletEntity = userEntity.getWalletEntity();
        Wallet wallet = new Wallet();
        wallet.setBalance(walletEntity.getBalance());
        wallet.setCreateTime(walletEntity.getCreateTime());
        user.setWallet(wallet);
        return user;
    }
}
