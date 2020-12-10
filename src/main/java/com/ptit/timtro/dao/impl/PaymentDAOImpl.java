package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.PaymentDAO;
import com.ptit.timtro.entity.PaymentEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@Transactional
public class PaymentDAOImpl implements PaymentDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void create(PaymentEntity paymentEntity) {
        entityManager.persist(paymentEntity);
    }
}
