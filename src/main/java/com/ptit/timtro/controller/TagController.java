package com.ptit.timtro.controller;

import com.ptit.timtro.model.Tag;
import com.ptit.timtro.service.TagService;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TagController {

    @Autowired
    private TagService tagService;


    @PostMapping("/tag/create")
    public DataResponse<String> create(@RequestBody Tag tag) {
        try {
            tagService.create(tag);
            return new DataResponse<>(true, "OK");
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, "Error");
        }
    }

    @PostMapping("/tag/update")
    public DataResponse<String> update(@RequestBody Tag tag) {
        try {
            tagService.update(tag);
            return new DataResponse<>(true, "Cập nhật thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, "Lỗi. Không cập nhật được.");
        }
    }

    @PostMapping("/tag/delete")
    public DataResponse<String> delete(@RequestParam("tagId") Integer tagId) {
        try {
            Tag tag = tagService.getById(tagId);
            if (tag.getPosts().size() == 0) {
                tagService.delete(tagId);
                return new DataResponse<>(true, "Đã xóa");
            } else {
                return new DataResponse<>(false, "Không xóa được. Tiện ích đang được sử dụng");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, "Lỗi. Không xóa được.");
        }
    }

    @GetMapping("/tag/get-all")
    public DataResponse<List<Tag>> getAllTags() {
        try {
            return new DataResponse<>(true, tagService.getAll());
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }
    }
}
