package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.FavoriteDAO;
import com.ptit.timtro.entity.FavoriteEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class FavoriteDAOImpl implements FavoriteDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<FavoriteEntity> getAll() {
        return entityManager.createQuery("select f from FavoriteEntity f", FavoriteEntity.class).getResultList();

    }
}
