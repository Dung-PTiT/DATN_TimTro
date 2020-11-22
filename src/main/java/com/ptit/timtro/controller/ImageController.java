package com.ptit.timtro.controller;

import com.ptit.timtro.util.FileDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@RestController
public class ImageController {

    @Autowired
    private FileDir fileDir;

    @GetMapping(value = "/image/get")
    public byte[] uploadImage(@RequestParam("imageUrl") String imageUrl) throws IOException {
        File serverFile = new File(fileDir.getFileDir() + imageUrl);
        return Files.readAllBytes(serverFile.toPath());
    }
}
