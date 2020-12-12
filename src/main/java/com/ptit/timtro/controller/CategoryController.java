package com.ptit.timtro.controller;

import com.ptit.timtro.model.Category;
import com.ptit.timtro.service.CategorySerivce;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategorySerivce categorySerivce;

    @PostMapping("/category/create")
    public DataResponse<String> create(@RequestBody Category category) {
        try {
            categorySerivce.create(category);
            return new DataResponse<>(true, "OK");
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, "Error");
        }
    }

    @PostMapping("/category/update")
    public DataResponse<String> update(@RequestBody Category category) {
        try {
            categorySerivce.update(category);
            return new DataResponse<>(true, "Cập nhật thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, "Lỗi. Không cập nhật được.");
        }
    }

    @PostMapping("/category/delete")
    public DataResponse<String> delete(@RequestParam("categoryId") Integer categoryId) {
        try {
            Category category = categorySerivce.getById(categoryId);
            if (category.getPosts().size() == 0) {
                categorySerivce.delete(categoryId);
                return new DataResponse<>(true, "Đã xóa");
            } else {
                return new DataResponse<>(false, "Không xóa được. Tiện ích đang được sử dụng");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, "Lỗi. Không xóa được.");
        }
    }

    @GetMapping("/category/get-all")
    public DataResponse<List<Category>> getAllCategories() {
        try {
            return new DataResponse<>(true, categorySerivce.getAll());
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }
    }
}
