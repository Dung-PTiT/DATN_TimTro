package com.ptit.timtro.controller;

import com.ptit.timtro.model.Post;
import com.ptit.timtro.service.PostService;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/post/create")
    public DataResponse<String> create(@ModelAttribute Post post) {
        System.out.println(post.getFiles().length);
        System.out.println(post.getTitle() + " " + post.getContent());
        return new DataResponse<>(true, "OK");
    }

    @GetMapping("/post/get-all")
    public DataResponse<List<Post>> getAllProvinces() {
        return new DataResponse<>(true, postService.getAll());
    }

}
