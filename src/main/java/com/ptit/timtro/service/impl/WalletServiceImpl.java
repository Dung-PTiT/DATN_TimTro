package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.WalletDAO;
import com.ptit.timtro.entity.UserEntity;
import com.ptit.timtro.entity.WalletEntity;
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
}
