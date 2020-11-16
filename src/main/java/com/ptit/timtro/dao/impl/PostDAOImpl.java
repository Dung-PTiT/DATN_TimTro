package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.PostDAO;
import com.ptit.timtro.entity.PostEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class PostDAOImpl implements PostDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void create(PostEntity postEntity) {
        entityManager.persist(postEntity);
    }

    @Override
    public List<PostEntity> getAll() {
        return entityManager.createQuery("select p from PostEntity p", PostEntity.class).getResultList();

    }
}
