package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.PostVipDAO;
import com.ptit.timtro.entity.PostVipEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class PostVipDAOImpl implements PostVipDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void update(PostVipEntity postVipEntity) {
        entityManager.merge(postVipEntity);
    }

    @Override
    public PostVipEntity getById(Integer id) {
        return entityManager.createQuery("select p from PostVipEntity p where p.id = " + id + "", PostVipEntity.class).getSingleResult();
    }

    @Override
    public List<PostVipEntity> getAll() {
        return entityManager.createQuery("select p from PostVipEntity p", PostVipEntity.class).getResultList();
    }
}
