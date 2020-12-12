package com.ptit.timtro.dao;

import com.ptit.timtro.entity.CategoryEntity;

import java.util.List;

public interface CategoryDAO {
    void create(CategoryEntity categoryEntity);

    void update(CategoryEntity categoryEntity);

    void delete(Integer id);

    CategoryEntity getById(Integer id);

    List<CategoryEntity> getAll();
}
