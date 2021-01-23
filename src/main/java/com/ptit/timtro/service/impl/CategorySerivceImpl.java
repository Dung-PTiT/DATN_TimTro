package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.CategoryDAO;
import com.ptit.timtro.entity.CategoryEntity;
import com.ptit.timtro.entity.PostEntity;
import com.ptit.timtro.model.Category;
import com.ptit.timtro.model.Post;
import com.ptit.timtro.service.CategorySerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategorySerivceImpl implements CategorySerivce {

    @Autowired
    private CategoryDAO categoryDAO;

    @Override
    public void create(Category category) {
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setName(category.getName());
        categoryEntity.setDescription(category.getDescription());
        categoryDAO.create(categoryEntity);
    }

    @Override
    public void update(Category category) {
        CategoryEntity categoryEntity = categoryDAO.getById(category.getId());
        categoryEntity.setName(category.getName());
        categoryEntity.setDescription(category.getDescription());
        categoryDAO.update(categoryEntity);
    }

    @Override
    public void delete(Integer id) {
        categoryDAO.delete(id);
    }

    @Override
    public Category getById(Integer id) {
        CategoryEntity categoryEntity = categoryDAO.getById(id);
        Category category = new Category();
        category.setId(categoryEntity.getId());
        category.setName(categoryEntity.getName());
        category.setDescription(categoryEntity.getDescription());
        return category;
    }

    @Override
    public List<Category> getAll() {
        List<CategoryEntity> categoryEntities = categoryDAO.getAll();
        if (categoryEntities != null) {
            return categoryEntities.stream().map(element ->
                    new Category(element.getId(), element.getName(), element.getDescription()))
                    .collect(Collectors.toList());
        }
        return null;
    }
}
