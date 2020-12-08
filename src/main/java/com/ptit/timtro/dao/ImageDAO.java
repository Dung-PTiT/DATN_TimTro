package com.ptit.timtro.dao;

import com.ptit.timtro.entity.ImageEntity;

public interface ImageDAO {
    ImageEntity create(ImageEntity imageEntity);

    void delete(Integer id);

    ImageEntity getById(Integer id);
}
