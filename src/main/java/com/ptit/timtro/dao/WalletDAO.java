package com.ptit.timtro.dao;

import com.ptit.timtro.entity.WalletEntity;

public interface WalletDAO {
    WalletEntity create(WalletEntity walletEntity);

    void update(WalletEntity walletEntity);

    WalletEntity getByUserId(Integer userId);

    WalletEntity getById(Integer id);
}