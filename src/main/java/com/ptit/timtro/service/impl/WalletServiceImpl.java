package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.WalletDAO;
import com.ptit.timtro.entity.UserEntity;
import com.ptit.timtro.entity.WalletEntity;
import com.ptit.timtro.model.User;
import com.ptit.timtro.model.Wallet;
import com.ptit.timtro.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class WalletServiceImpl implements WalletService {

    @Autowired
    private WalletDAO walletDAO;

    @Override
    public Integer create(Wallet wallet) {
        WalletEntity walletEntity = new WalletEntity();
        walletEntity.setBalance(wallet.getBalance());
        walletEntity.setCreateTime(wallet.getCreateTime());

        UserEntity userEntity = new UserEntity();
        userEntity.setId(wallet.getUser().getId());

        walletEntity.setUserEntity(userEntity);
        return walletDAO.create(walletEntity).getId();
    }

    @Override
    public void update(Wallet wallet) {
        WalletEntity walletEntity = walletDAO.getById(wallet.getId());
        walletEntity.setBalance(wallet.getBalance());
        walletDAO.update(walletEntity);
    }

    @Override
    public Wallet getById(Integer id) {
        WalletEntity walletEntity = walletDAO.getById(id);
        Wallet wallet = new Wallet();
        wallet.setId(walletEntity.getId());
        wallet.setBalance(walletEntity.getBalance());
        wallet.setCreateTime(walletEntity.getCreateTime());

        UserEntity userEntity = walletEntity.getUserEntity();
        User user = new User();
        user.setId(userEntity.getId());
        wallet.setUser(user);
        return wallet;
    }

    @Override
    public Wallet getByUserId(Integer userId) {
        WalletEntity walletEntity = walletDAO.getByUserId(userId);
        Wallet wallet = new Wallet();
        wallet.setId(walletEntity.getId());
        wallet.setBalance(walletEntity.getBalance());
        wallet.setCreateTime(walletEntity.getCreateTime());

        UserEntity userEntity = walletEntity.getUserEntity();
        User user = new User();
        user.setId(userEntity.getId());
        wallet.setUser(user);
        return wallet;
    }
}
