package com.ptit.timtro.controller;

import com.ptit.timtro.entity.PostEntity;
import com.ptit.timtro.model.Image;
import com.ptit.timtro.model.Post;
import com.ptit.timtro.service.ImageService;
import com.ptit.timtro.service.PostService;
import com.ptit.timtro.util.DataResponse;
import com.ptit.timtro.util.FileDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private FileDir fileDir;

    @PostMapping("/post/create")
    public DataResponse<String> create(@ModelAttribute Post post) {
        PostEntity postEntity = postService.create(post);
        try {
            saveImage(post.getFiles(), postEntity.getId());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new DataResponse<>(true, "OK");
    }

    @GetMapping("/post/get-by-id")
    public DataResponse<Post> getPostById(@RequestParam("id") Integer id) {
        return new DataResponse<>(true, postService.getById(id));
    }

    @GetMapping("/post/get-all")
    public DataResponse<List<Post>> getAllProvinces() {
        return new DataResponse<>(true, postService.getAll());
    }

    // Save Files
    private void saveImage(MultipartFile[] files, Integer postID) throws IOException {
        for (MultipartFile file : files) {

            //Insert to image table
            Image image = new Image();
            image.setImageUrl(file.getOriginalFilename());
            Post post1 = new Post();
            post1.setId(postID);
            image.setPost(post1);
            imageService.create(image);

            //Save image in folder
            File uploadDir = new File(fileDir.getFileDir());
            uploadDir.mkdirs();
            String uploadFilePath = fileDir.getFileDir() + "/" + file.getOriginalFilename();
            byte[] bytes = file.getBytes();
            Path path = Paths.get(uploadFilePath);
            Files.write(path, bytes);
        }
    }
}
