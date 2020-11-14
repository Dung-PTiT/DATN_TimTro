package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.ProvinceDAO;
import com.ptit.timtro.entity.ProvinceEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class ProvinceDAOImpl implements ProvinceDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<ProvinceEntity> getAll() {
        return entityManager.createQuery("select p from ProvinceEntity p", ProvinceEntity.class).getResultList();
    }

    @Override
    public ProvinceEntity getById(Integer id) {
        return entityManager.createQuery("select p from ProvinceEntity p where p.id = " + id + "", ProvinceEntity.class).getSingleResult();
    }
}
