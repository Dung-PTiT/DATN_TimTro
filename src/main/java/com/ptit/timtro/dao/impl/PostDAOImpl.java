package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.PostDAO;
import com.ptit.timtro.entity.PostEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
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
    public void update(PostEntity postEntity) {
        entityManager.merge(postEntity);
    }

    @Override
    public void delete(Integer id) {
        entityManager.remove(getById(id));
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

    @Override
    public void updateStatus(Integer id, Boolean status) {
        String hql = "update PostEntity set status = " + status + " where id = :id";
        Query query = entityManager.createQuery(hql);
        query.setParameter("id", id);
        query.executeUpdate();
    }

    @Override
    public List<PostEntity> getRecommendPost(double latitude, double longitude, Integer categoryId, Integer currentPostId) {

        double latitudeStart = latitude - 0.009;
        double latitudeEnd = latitude + 0.009;
        double longitudeStart = longitude - 0.009;
        double longitudeEnd = longitude + 0.009;

        return entityManager.createQuery(
                "SELECT p FROM PostEntity as p where p.id != " + currentPostId + " and (p.latitude between " + latitudeStart + " and " + latitudeEnd + ") and (p.longitude between " + longitudeStart + " and " + longitudeEnd + ") and p.status = true and p.categoryEntity.id = " + categoryId + " order by p.createTime DESC", PostEntity.class).setMaxResults(5).getResultList();
    }
}
