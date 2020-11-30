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
    public PostEntity create(PostEntity postEntity) {
        entityManager.persist(postEntity);
        return postEntity;
    }

    @Override
    public PostEntity getById(Integer id) {
        return entityManager.createQuery("select p from PostEntity p where p.id = " + id + "", PostEntity.class).getSingleResult();
    }

    @Override
    public List<PostEntity> getByUserId(Integer id) {
        return entityManager.createQuery("select p from PostEntity p where p.userEntity.id = " + id + " order by p.createTime DESC", PostEntity.class).getResultList();
    }

    @Override
    public List<PostEntity> getAll() {
        return entityManager.createQuery("select p from PostEntity p", PostEntity.class).getResultList();
    }
}
