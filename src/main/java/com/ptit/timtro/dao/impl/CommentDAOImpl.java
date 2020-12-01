package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.CommentDAO;
import com.ptit.timtro.entity.CommentEntity;
import com.ptit.timtro.entity.UserEntity;
import com.ptit.timtro.security.AdvancedSecurityContextHolder;
import com.ptit.timtro.security.UserPrincipal;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

import static javafx.scene.AccessibleAttribute.ROLE;

@Repository
@Transactional
public class CommentDAOImpl implements CommentDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public CommentEntity create(CommentEntity commentEntity) {
        entityManager.persist(commentEntity);
        return commentEntity;
    }

    @Override
    public void delete(Integer id) {
        entityManager.remove(getById(id));
    }

    @Override
    public CommentEntity getById(Integer id) {
        return entityManager.createQuery("select c from CommentEntity c where c.id = " + id + "", CommentEntity.class).getSingleResult();
    }

    @Override
    public List<CommentEntity> getByUserId(Integer id) {
        return entityManager.createQuery("select c from CommentEntity c where c.userEntity.id = " + id + " order by c.createTime desc", CommentEntity.class).getResultList();
    }

    @Override
    public List<CommentEntity> getByPostId(Integer id) {
        return entityManager.createQuery("select c from CommentEntity c where c.postEntity.id = " + id + " order by c.createTime desc", CommentEntity.class).getResultList();
    }

    @Override
    public List<CommentEntity> getAll() {
        return entityManager.createQuery("select c from CommentEntity c", CommentEntity.class).getResultList();
    }

    @Override
    public boolean checkExist(Integer id) {
        String query = "select count(c) from CommentEntity c where c.id = " + id + "";
        Long count = (Long) entityManager.createQuery(query).getSingleResult();
        return (!count.equals(0L));
    }
}
