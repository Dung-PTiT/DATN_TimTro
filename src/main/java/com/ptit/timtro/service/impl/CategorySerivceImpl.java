package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.CategoryDAO;
import com.ptit.timtro.entity.CategoryEntity;
import com.ptit.timtro.model.Category;
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
    public List<Category> getAll() {
        List<CategoryEntity> categoryEntities = categoryDAO.getAll();
        if (categoryEntities != null) {
            return categoryEntities.stream().map(element ->
                    new Category(element.getId(), element.getName(), element.getDescription(), null))
                    .collect(Collectors.toList());
        }
        return null;
    }
}
