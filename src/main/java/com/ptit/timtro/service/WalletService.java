package com.ptit.timtro.service;

import com.ptit.timtro.model.Wallet;

public interface WalletService {
    Integer create(Wallet wallet);

    void update(Wallet wallet);

    Wallet getById(Integer id);

    Wallet getByUserId(Integer userId);
}
