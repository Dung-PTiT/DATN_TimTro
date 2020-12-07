package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.WalletDAO;
import com.ptit.timtro.entity.WalletEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@Transactional
public class WalletDAOImpl implements WalletDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public WalletEntity create(WalletEntity walletEntity) {
        entityManager.persist(walletEntity);
        return walletEntity;
    }
}
