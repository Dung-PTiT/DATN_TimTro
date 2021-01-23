package com.ptit.timtro.controller;

import com.ptit.timtro.entity.PostEntity;
import com.ptit.timtro.model.Image;
import com.ptit.timtro.model.Post;
import com.ptit.timtro.security.AdvancedSecurityContextHolder;
import com.ptit.timtro.security.UserPrincipal;
import com.ptit.timtro.service.ImageService;
import com.ptit.timtro.service.PaymentService;
import com.ptit.timtro.service.PostService;
import com.ptit.timtro.util.DataResponse;
import com.ptit.timtro.util.FileDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private FileDir fileDir;

    @PostMapping("/post/create")
    public DataResponse<String> create(@ModelAttribute Post post) {
        try {
            PostEntity postEntity = postService.create(post);
            if (post.getFiles() != null) {
                saveImage(post.getFiles(), postEntity.getId());
            }
            return new DataResponse<>(true, "Tạo bài viết thành công");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, "Error");
    }

    @PostMapping("/post/update")
    public DataResponse<String> update(@ModelAttribute Post post) {
        try {
            postService.update(post);
            if (post.getFiles() != null) {
                updateImage(post.getFiles(), post.getId());
            }
            return new DataResponse<>(true, "Cập nhật bài viết thành công");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, "Error");
    }

    @PostMapping("/post/delete")
    public DataResponse<String> delete(@RequestParam("id") Integer id) {
        try {
            //ToDo xóa bởi admin
            UserPrincipal userPrincipal = AdvancedSecurityContextHolder.getUserPrincipal();
            Post post = postService.getById(id);
            if (post.getUser().getId().equals(userPrincipal.getId())) {
                postService.delete(id);
                Arrays.stream(Objects.requireNonNull(new File(fileDir.getFileDir() + id).listFiles())).forEach(File::delete);
                Path path = FileSystems.getDefault().getPath(fileDir.getFileDir() + id);
                Files.deleteIfExists(path);
                return new DataResponse<>(true, "Xóa bài biết thành công");
            } else {
                return new DataResponse<>(false, "Lỗi");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, "Error");
    }

    @PostMapping("/post/remove")
    public DataResponse<String> remove(@RequestParam("id") Integer id) {
        try {
            postService.updateStatus(id, false);
            paymentService.updateStatusByPostId(id);
            return new DataResponse<>(true, "Gỡ bài biết thành công");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, "Error");
    }

    @GetMapping("/post/get-by-id")
    public DataResponse<Post> getPostById(@RequestParam("id") Integer id) {
        try {
            return new DataResponse<>(true, postService.getById(id));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, null);
    }

    @GetMapping("/post/get-by-user-id")
    public DataResponse<List<Post>> getPostUserId(@RequestParam("userId") Integer userId) {
        try {
            return new DataResponse<>(true, postService.getByUserId(userId));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, null);
    }

    @GetMapping("/post/get-all")
    public DataResponse<List<Post>> getAllProvinces() {
        try {
            return new DataResponse<>(true, postService.getAll());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, null);
    }

    // Save Files
    private void saveImage(MultipartFile[] files, Integer postID) throws IOException {
        try {
            for (MultipartFile file : files) {
                //Insert to image table
                Image image = new Image();
                image.setImageUrl(file.getOriginalFilename());
                imageService.create(image, postID);

                //Save image in folder
                File uploadDir = new File(fileDir.getFileDir() + postID + File.separator);
                uploadDir.mkdirs();
                String uploadFilePath = fileDir.getFileDir() + File.separator + postID + File.separator + file.getOriginalFilename();
                byte[] bytes = file.getBytes();
                Path path = Paths.get(uploadFilePath);
                Files.write(path, bytes);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Update Files
    private void updateImage(MultipartFile[] files, Integer postID) throws IOException {
        try {
            for (MultipartFile file : files) {
                //Insert to image table
                Image image = new Image();
                image.setImageUrl(file.getOriginalFilename());
                imageService.create(image, postID);

                String uploadFilePath = fileDir.getFileDir() + File.separator + postID + File.separator + file.getOriginalFilename();
                byte[] bytes = file.getBytes();
                Path path = Paths.get(uploadFilePath);
                Files.write(path, bytes);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
