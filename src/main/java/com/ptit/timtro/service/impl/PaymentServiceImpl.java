package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.PaymentDAO;
import com.ptit.timtro.entity.PaymentEntity;
import com.ptit.timtro.entity.PostEntity;
import com.ptit.timtro.entity.PostVipEntity;
import com.ptit.timtro.entity.UserEntity;
import com.ptit.timtro.model.Image;
import com.ptit.timtro.model.Payment;
import com.ptit.timtro.model.Post;
import com.ptit.timtro.model.PostVip;
import com.ptit.timtro.security.AdvancedSecurityContextHolder;
import com.ptit.timtro.service.PaymentService;
import com.ptit.timtro.service.PostService;
import com.ptit.timtro.service.PostVipService;
import com.ptit.timtro.service.UserService;
import com.ptit.timtro.util.FetchEnablePostRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentDAO paymentDAO;

    @Autowired
    private PostVipService postVipService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Override
    public void create(Payment payment) {
        PaymentEntity paymentEntity = new PaymentEntity();

        paymentEntity.setPrice(payment.getPrice());
        paymentEntity.setStartDate(payment.getStartDate());
        paymentEntity.setEndDate(payment.getEndDate());
        paymentEntity.setDescription("<p>Thời gian đăng trong " + payment.getDescription()
                + "</p><p>" + payment.getPostVip().toString() + "</p>");
        paymentEntity.setStatus(true);

        UserEntity userEntity = new UserEntity();
        userEntity.setId(AdvancedSecurityContextHolder.getUserPrincipal().getId());
        paymentEntity.setUserEntity(userEntity);

        PostEntity postEntity = new PostEntity();
        postEntity.setId(payment.getPost().getId());
        paymentEntity.setPostEntity(postEntity);

        PostVipEntity postVipEntity = new PostVipEntity();
        postVipEntity.setId(payment.getPostVip().getId());
        paymentEntity.setPostVipEntity(postVipEntity);

        paymentDAO.create(paymentEntity);
    }

    @Override
    public void updateStatusByPostId(Integer postId) {
        paymentDAO.updateStatusByPostId(postId);
    }

    @Override
    public void updateStatusById(Integer id, Boolean status) {
        paymentDAO.updateStatusById(id, status);
    }

    @Override
    public List<Payment> getByUserId(Integer userId) {
        List<PaymentEntity> paymentEntities = paymentDAO.getByUserId(userId);
        if (paymentEntities != null) {
            return paymentEntities.stream().map(paymentEntity ->
            {
                Payment payment = new Payment();
                payment.setId(paymentEntity.getId());
                payment.setPrice(paymentEntity.getPrice());
                payment.setStartDate(paymentEntity.getStartDate());
                payment.setEndDate(paymentEntity.getEndDate());
                payment.setDescription(paymentEntity.getDescription());
                payment.setStatus(paymentEntity.getStatus());

                PostEntity postEntity = paymentEntity.getPostEntity();
                Post post = new Post();
                post.setId(postEntity.getId());
                post.setTitle(postEntity.getTitle());
                post.setImages(postEntity.getImages().stream().map(imageEntity -> {
                            Image image = new Image();
                            image.setId(imageEntity.getId());
                            image.setImageUrl(imageEntity.getImageUrl());
                            return image;
                        }
                ).collect(Collectors.toList()));
                payment.setPost(post);
                return payment;
            }).collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public List<Payment> fetchEnablePost(FetchEnablePostRequest fetchEnablePostRequest) {
        List<PaymentEntity> paymentEntities = paymentDAO.fetchEnablePost(fetchEnablePostRequest);
        if (paymentEntities != null) {
            return paymentEntities.stream().map(paymentEntity ->
            {
                Payment payment = new Payment();
                payment.setId(paymentEntity.getId());
                payment.setPrice(paymentEntity.getPrice());
                payment.setStartDate(paymentEntity.getStartDate());
                payment.setEndDate(paymentEntity.getEndDate());
                payment.setDescription(paymentEntity.getDescription());
                payment.setStatus(paymentEntity.getStatus());
                payment.setPostVip(postVipService.getById(paymentEntity.getPostVipEntity().getId()));
                payment.setUser(userService.get(paymentEntity.getUserEntity().getId()));
                payment.setPost(postService.getById(paymentEntity.getPostEntity().getId()));
                return payment;
            }).collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public List<Payment> getAll() {
        List<PaymentEntity> paymentEntities = paymentDAO.getAll();
        if (paymentEntities != null) {
            return paymentEntities.stream().map(paymentEntity ->
            {
                Payment payment = new Payment();
                payment.setId(paymentEntity.getId());
                payment.setPrice(paymentEntity.getPrice());
                payment.setStartDate(paymentEntity.getStartDate());
                payment.setEndDate(paymentEntity.getEndDate());
                payment.setDescription(paymentEntity.getDescription());
                payment.setStatus(paymentEntity.getStatus());
                payment.setPostVip(postVipService.getById(paymentEntity.getPostVipEntity().getId()));
                payment.setUser(userService.get(paymentEntity.getUserEntity().getId()));
                payment.setPost(postService.getById(paymentEntity.getPostEntity().getId()));
                return payment;
            }).collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public List<Payment> getEnablePost(Date date) {
        List<PaymentEntity> paymentEntities = paymentDAO.getEnablePost(date);
        if (paymentEntities != null) {
            return paymentEntities.stream().map(paymentEntity ->
            {
                Payment payment = new Payment();
                payment.setId(paymentEntity.getId());

                PostEntity postEntity = paymentEntity.getPostEntity();
                Post post = new Post();
                post.setId(postEntity.getId());
                payment.setPost(post);
                return payment;
            }).collect(Collectors.toList());
        }
        return null;
    }
}
