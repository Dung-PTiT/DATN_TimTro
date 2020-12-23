package com.ptit.timtro.service;

import com.ptit.timtro.model.Wallet;

import java.util.List;

public interface WalletService {
    Integer create(Wallet wallet);

    void update(Wallet wallet);

    Wallet getById(Integer id);

    Wallet getByUserId(Integer userId);

    List<Wallet> getAll();
}
