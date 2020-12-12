package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.TagDAO;
import com.ptit.timtro.entity.TagEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class TagDAOImpl implements TagDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void create(TagEntity tagEntity) {
        entityManager.persist(tagEntity);
    }

    @Override
    public void update(TagEntity tagEntity) {
        entityManager.merge(tagEntity);
    }

    @Override
    public void delete(Integer id) {
        entityManager.remove(getById(id));
    }

    @Override
    public TagEntity getById(Integer id) {
        return entityManager.createQuery("select t from TagEntity t where t.id = " + id + "", TagEntity.class).getSingleResult();

    }

    @Override
    public List<TagEntity> getAll() {
        return entityManager.createQuery("select t from TagEntity t", TagEntity.class).getResultList();
    }
}
