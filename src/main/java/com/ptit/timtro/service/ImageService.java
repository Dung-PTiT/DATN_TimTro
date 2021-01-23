package com.ptit.timtro.service;

import com.ptit.timtro.entity.ImageEntity;
import com.ptit.timtro.model.Image;

public interface ImageService {
    ImageEntity create(Image image, Integer postId);

    void delete(Integer id);

    Image getById(Integer id);
}
