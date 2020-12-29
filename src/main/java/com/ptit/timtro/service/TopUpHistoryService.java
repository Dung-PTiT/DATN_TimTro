package com.ptit.timtro.service;

import com.ptit.timtro.model.TopUpHistory;

import java.util.List;

public interface TopUpHistoryService {
    void create(TopUpHistory topUpHistory);
    List<TopUpHistory> getByWalletId(Integer walletId);
}
