package com.ptit.timtro.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ptit.timtro.model.Image;
import com.ptit.timtro.model.Post;
import com.ptit.timtro.service.ImageService;
import com.ptit.timtro.util.DataResponse;
import com.ptit.timtro.util.FileDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Objects;

@RestController
public class ImageController {

    @Autowired
    private FileDir fileDir;

    @Autowired
    private ImageService imageService;

    @GetMapping("/image/get")
    public byte[] uploadImage(@RequestParam("imageUrl") String imageUrl) throws IOException {
        try {
            File serverFile = new File(fileDir.getFileDir() + imageUrl);
            return Files.readAllBytes(serverFile.toPath());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/image/delete")
    public DataResponse<String> deleteImage(@RequestParam("image") String imageDelete,
                                            @RequestParam("post") String postUpdate) {
        try {
            Image image = new ObjectMapper().readValue(imageDelete, Image.class);
            Post post = new ObjectMapper().readValue(postUpdate, Post.class);
            try {
                imageService.delete(image.getId());
                Path path = FileSystems.getDefault().getPath(fileDir.getFileDir() + "/" + post.getId() + "/" + image.getImageUrl());
                Files.deleteIfExists(path);
                return new DataResponse<>(true, "OK");
            } catch (IOException e) {
                e.printStackTrace();
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, "Error");
    }
}
