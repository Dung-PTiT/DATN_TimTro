package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.WalletDAO;
import com.ptit.timtro.entity.WalletEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

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

    @Override
    public void update(WalletEntity walletEntity) {
        entityManager.merge(walletEntity);
    }

    @Override
    public WalletEntity getByUserId(Integer userId) {
        return entityManager.createQuery("select w from WalletEntity w where w.userEntity.id = " + userId + "", WalletEntity.class).getSingleResult();
    }

    @Override
    public WalletEntity getById(Integer id) {
        return entityManager.createQuery("select w from WalletEntity w where w.id = " + id + "", WalletEntity.class).getSingleResult();
    }

    @Override
    public List<WalletEntity> getAll() {
        return entityManager.createQuery("select w from WalletEntity w", WalletEntity.class).getResultList();
    }
}
