package com.ptit.timtro.controller;

import com.ptit.timtro.model.Category;
import com.ptit.timtro.service.CategorySerivce;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategorySerivce categorySerivce;

    @GetMapping("/category/get-all")
    public DataResponse<List<Category>> getAllCategories() {
        return new DataResponse<>(true, categorySerivce.getAll());
    }
}
