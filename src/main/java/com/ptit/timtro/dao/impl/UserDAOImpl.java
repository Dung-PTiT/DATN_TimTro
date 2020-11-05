package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.UserDAO;
import com.ptit.timtro.entity.UserEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.List;

@Repository
@Transactional
public class UserDAOImpl implements UserDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public UserEntity create(UserEntity userEntity) {
        entityManager.persist(userEntity);
        return userEntity;
    }

    @Override
    public UserEntity get(Integer id) {
        return entityManager.find(UserEntity.class, id);
    }

    @Override
    public List<UserEntity> getAll() {
        return entityManager.createQuery("select u from UserEntity u", UserEntity.class).getResultList();
    }

    @Override
    public UserEntity update(UserEntity userEntity) {
        entityManager.merge(userEntity);
        return userEntity;
    }

    @Override
    public void delete(UserEntity userEntity) {
        entityManager.remove(userEntity);
    }

    @Override
    public UserEntity getByUsername(String username) {
        try {
            return entityManager.createQuery("select u from UserEntity u where u.username = '" + username + "'", UserEntity.class).getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public UserEntity getByEmail(String email) {
        try {
            return entityManager.createQuery("select u from UserEntity u where u.email = '" + email + "'", UserEntity.class).getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public UserEntity checkExistedUser(String email, String typeAuthProvider) {
        try {
            return entityManager.createQuery("select u from UserEntity u where u.email = '" + email + "' and u.authProvider = '" + typeAuthProvider + "'", UserEntity.class).getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }
}
