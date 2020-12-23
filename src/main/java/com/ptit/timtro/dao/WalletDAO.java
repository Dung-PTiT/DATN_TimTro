package com.ptit.timtro.dao;

import com.ptit.timtro.entity.WalletEntity;

import java.util.List;

public interface WalletDAO {
    WalletEntity create(WalletEntity walletEntity);

    void update(WalletEntity walletEntity);

    WalletEntity getByUserId(Integer userId);

    WalletEntity getById(Integer id);

    List<WalletEntity> getAll();
}