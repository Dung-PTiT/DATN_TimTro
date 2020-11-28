package com.ptit.timtro.controller;

import com.ptit.timtro.model.Tag;
import com.ptit.timtro.service.TagService;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TagController {

    @Autowired
    private TagService tagService;

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
