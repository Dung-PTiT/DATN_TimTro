package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.TopUpHistoryDAO;
import com.ptit.timtro.entity.TopUpHistoryEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class TopUpHistoryDAOImpl implements TopUpHistoryDAO {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public void create(TopUpHistoryEntity topUpHistoryEntity) {
        entityManager.persist(topUpHistoryEntity);
    }

    @Override
    public List<TopUpHistoryEntity> getByWalletId(Integer walletId) {
        return entityManager.createQuery("select t from TopUpHistoryEntity t where t.walletEntity.id = " + walletId + "", TopUpHistoryEntity.class).getResultList();

    }
}
