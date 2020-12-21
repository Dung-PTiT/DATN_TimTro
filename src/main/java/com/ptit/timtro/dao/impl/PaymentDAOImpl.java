package com.ptit.timtro.dao.impl;

import com.ptit.timtro.dao.PaymentDAO;
import com.ptit.timtro.entity.PaymentEntity;
import com.ptit.timtro.util.FetchEnablePostRequest;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class PaymentDAOImpl implements PaymentDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void create(PaymentEntity paymentEntity) {
        entityManager.persist(paymentEntity);
    }

    @Override
    public List<PaymentEntity> fetchEnablePost(FetchEnablePostRequest fetchEnablePostRequest) {
        String provinceId = fetchEnablePostRequest.getProvinceId();
        String districtId = fetchEnablePostRequest.getDistrictId();
        String wardId = fetchEnablePostRequest.getWardId();
        String minPrice = fetchEnablePostRequest.getMinPrice();
        String maxPrice = fetchEnablePostRequest.getMaxPrice();
        String minAcreage = fetchEnablePostRequest.getMinAcreage();
        String maxAcreage = fetchEnablePostRequest.getMaxAcreage();
        String categoryId = fetchEnablePostRequest.getCategoryId();

        if (provinceId.equals("null") && minPrice.equals("null") && minAcreage.equals("null") && categoryId.equals("null")) {
            return entityManager.createQuery(
                    "SELECT p FROM PaymentEntity as p where p.status = true order by p.postVipEntity.id ASC, p.startDate desc", PaymentEntity.class)
                    .getResultList();
        } else {
            String sql = generateFetchEnablePost(provinceId, districtId, wardId, minPrice, maxPrice, minAcreage, maxAcreage, categoryId);
            return entityManager.createQuery(sql, PaymentEntity.class).getResultList();
        }
    }

    public String generateFetchEnablePost(String provinceId, String districtId, String wardId,
                                          String minPrice, String maxPrice,
                                          String minAcreage, String maxAcreage,
                                          String categoryId) {
        String pattern = "";
        String genSql;
        if (!provinceId.equals("null")) {
            pattern += " and p.postEntity.provinceEntity.id = " + Integer.parseInt(provinceId) +
                    " and p.postEntity.districtEntity.id = " + Integer.parseInt(districtId) +
                    " and p.postEntity.wardEntity.id = " + Integer.parseInt(wardId);
        } else {
            pattern += "";
        }
        if (!minPrice.equals("null")) {
            pattern += " and p.postEntity.price between " + Integer.parseInt(minPrice) + " and " + Integer.parseInt(maxPrice);
        } else {
            pattern += "";
        }
        if (!minAcreage.equals("null")) {
            pattern += " and p.postEntity.acreage between " + Integer.parseInt(minAcreage) + " and " + Integer.parseInt(maxAcreage);
        } else {
            pattern += "";
        }
        if (!categoryId.equals("null")) {
            pattern += " and p.postEntity.categoryEntity.id = " + Integer.parseInt(categoryId);
        } else {
            pattern += "";
        }
        if (pattern.equals("")) {
            genSql = "SELECT p FROM PaymentEntity as p where p.status = true order by p.postVipEntity.id ASC, p.startDate desc";
        } else {
            genSql = "SELECT p FROM PaymentEntity as p where p.status = true" + pattern + " order by p.postVipEntity.id ASC, p.startDate desc";
        }
        return genSql;
    }
}
