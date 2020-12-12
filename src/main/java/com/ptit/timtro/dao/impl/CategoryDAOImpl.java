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
    public void create(CategoryEntity categoryEntity) {
        entityManager.persist(categoryEntity);
    }

    @Override
    public void update(CategoryEntity categoryEntity) {
        entityManager.merge(categoryEntity);
    }

    @Override
    public void delete(Integer id) {
        entityManager.remove(getById(id));
    }

    @Override
    public CategoryEntity getById(Integer id) {
        return entityManager.createQuery("select c from CategoryEntity c where c.id = " + id + "", CategoryEntity.class).getSingleResult();
    }

    @Override
    public List<CategoryEntity> getAll() {
        return entityManager.createQuery("select c from CategoryEntity c", CategoryEntity.class).getResultList();
    }
}
