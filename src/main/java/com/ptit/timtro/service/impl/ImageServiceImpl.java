package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.ImageDAO;
import com.ptit.timtro.entity.ImageEntity;
import com.ptit.timtro.entity.PostEntity;
import com.ptit.timtro.model.Image;
import com.ptit.timtro.service.ImageService;
import com.ptit.timtro.util.FileDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ImageServiceImpl implements ImageService {

    @Autowired
    private FileDir fileDir;

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
}
