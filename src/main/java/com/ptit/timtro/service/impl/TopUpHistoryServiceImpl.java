package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.TopUpHistoryDAO;
import com.ptit.timtro.entity.TopUpHistoryEntity;
import com.ptit.timtro.entity.WalletEntity;
import com.ptit.timtro.model.TopUpHistory;
import com.ptit.timtro.service.TopUpHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TopUpHistoryServiceImpl implements TopUpHistoryService {

    @Autowired
    private TopUpHistoryDAO topUpHistoryDAO;


    @Override
    public void create(TopUpHistory topUpHistory) {
        TopUpHistoryEntity topUpHistoryEntity = new TopUpHistoryEntity();
        topUpHistoryEntity.setBalance(topUpHistory.getBalance());
        topUpHistoryEntity.setCreateTime(topUpHistory.getCreateTime());

        WalletEntity walletEntity = new WalletEntity();
        walletEntity.setId(topUpHistory.getWallet().getId());
        topUpHistoryEntity.setWalletEntity(walletEntity);

        topUpHistoryDAO.create(topUpHistoryEntity);
    }

    @Override
    public List<TopUpHistory> getByWalletId(Integer walletId) {
        List<TopUpHistoryEntity> topUpHistoryEntities = topUpHistoryDAO.getByWalletId(walletId);
        return topUpHistoryEntities.stream().map(topUpHistoryEntity -> {
            TopUpHistory topUpHistory = new TopUpHistory();
            topUpHistory.setId(topUpHistoryEntity.getId());
            topUpHistory.setBalance(topUpHistoryEntity.getBalance());
            topUpHistory.setCreateTime(topUpHistoryEntity.getCreateTime());
            topUpHistory.setWallet(null);
            return topUpHistory;
        }).collect(Collectors.toList());
    }
}
