package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.ImageDAO;
import com.ptit.timtro.entity.ImageEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@Transactional
public class ImageDAOImpl implements ImageDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public ImageEntity create(ImageEntity imageEntity) {
        entityManager.persist(imageEntity);
        return imageEntity;
    }
}
