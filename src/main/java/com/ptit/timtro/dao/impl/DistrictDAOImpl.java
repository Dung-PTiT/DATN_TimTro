package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.DistrictDAO;
import com.ptit.timtro.entity.DistrictEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class DistrictDAOImpl implements DistrictDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<DistrictEntity> getAll() {
        return entityManager.createQuery("select d from DistrictEntity d", DistrictEntity.class).getResultList();
    }

    @Override
    public DistrictEntity getById(Integer id) {
        return entityManager.createQuery("select d from DistrictEntity d where d.id = " + id + "", DistrictEntity.class).getSingleResult();
    }
}
