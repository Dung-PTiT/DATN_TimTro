package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.ImageDAO;
import com.ptit.timtro.entity.ImageEntity;
import com.ptit.timtro.entity.PostEntity;
import com.ptit.timtro.model.Image;
import com.ptit.timtro.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageDAO imageDAO;

    @Override
    public ImageEntity create(Image image) {
        ImageEntity imageEntity = new ImageEntity();
        imageEntity.setImageUrl(image.getImageUrl());

        PostEntity postEntity = new PostEntity();
        postEntity.setId(image.getPost().getId());
        imageEntity.setPostEntity(postEntity);

        return imageDAO.create(imageEntity);
    }

    @Override
    public void delete(Integer id) {
        imageDAO.delete(id);
    }

    @Override
    public Image getById(Integer id) {
        ImageEntity imageEntity = imageDAO.getById(id);
        Image image = new Image();
        image.setId(imageEntity.getId());
        image.setImageUrl(imageEntity.getImageUrl());
        image.setPost(null);
        return image;
    }
}
