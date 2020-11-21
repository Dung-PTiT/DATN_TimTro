package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.CategoryDAO;
import com.ptit.timtro.entity.CategoryEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class CategoryDAOImpl implements CategoryDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<CategoryEntity> getAll() {
        return entityManager.createQuery("select c from CategoryEntity c", CategoryEntity.class).getResultList();
    }
}
