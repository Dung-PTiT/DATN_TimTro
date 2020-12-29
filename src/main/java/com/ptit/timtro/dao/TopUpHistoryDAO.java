package com.ptit.timtro.dao;

import com.ptit.timtro.entity.TopUpHistoryEntity;

import java.util.List;

public interface TopUpHistoryDAO {
    void create(TopUpHistoryEntity topUpHistoryEntity);

    List<TopUpHistoryEntity> getByWalletId(Integer walletId);
}
