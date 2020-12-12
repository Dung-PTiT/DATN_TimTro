package com.ptit.timtro.service;

import com.ptit.timtro.model.Category;

import java.util.List;

public interface CategorySerivce {
    void create(Category category);

    void update(Category category);

    void delete(Integer id);

    Category getById(Integer id);

    List<Category> getAll();
}
