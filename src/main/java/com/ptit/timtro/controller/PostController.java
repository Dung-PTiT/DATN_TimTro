package com.ptit.timtro.controller;

import com.ptit.timtro.model.Post;
import com.ptit.timtro.service.PostService;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/post/get-all")
    public DataResponse<List<Post>> getAllProvinces() {
        return new DataResponse<>(true, postService.getAll());
    }

}
