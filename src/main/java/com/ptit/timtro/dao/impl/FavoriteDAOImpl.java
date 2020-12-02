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
    public void create(FavoriteEntity favoriteEntity) {
        entityManager.persist(favoriteEntity);
    }

    @Override
    public void delete(Integer id) {
        entityManager.remove(getById(id));
    }

    @Override
    public FavoriteEntity getById(Integer id) {
        return entityManager.createQuery("select f from FavoriteEntity f where f.id = " + id + "", FavoriteEntity.class).getSingleResult();

    }

    @Override
    public List<FavoriteEntity> getByUserId(Integer id) {
        return entityManager.createQuery("select f from FavoriteEntity f where f.userEntity.id = " + id + " order by f.createTime desc", FavoriteEntity.class).getResultList();
    }

    @Override
    public List<FavoriteEntity> getAll() {
        return entityManager.createQuery("select f from FavoriteEntity f", FavoriteEntity.class).getResultList();
    }

    @Override
    public FavoriteEntity getByPostIdUserId(Integer postId, Integer userId) {
        return entityManager.createQuery(
                "select f from FavoriteEntity f where f.postEntity.id = " + postId + " and f.userEntity.id = " + userId + "",
                FavoriteEntity.class).getSingleResult();
    }

    @Override
    public boolean checkPostIdUserId(Integer postId, Integer userId) {
        String query = "select count(f) from FavoriteEntity f where f.postEntity.id = " + postId + " and f.userEntity.id = " + userId + "";
        Long count = (Long) entityManager.createQuery(query).getSingleResult();
        return (!count.equals(0L));
    }
}
