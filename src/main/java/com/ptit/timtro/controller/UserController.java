package com.ptit.timtro.controller;

import com.ptit.timtro.model.User;
import com.ptit.timtro.security.AdvancedSecurityContextHolder;
import com.ptit.timtro.security.Role;
import com.ptit.timtro.security.UserPrincipal;
import com.ptit.timtro.service.UserService;
import com.ptit.timtro.util.DataResponse;
import com.ptit.timtro.util.FileDir;
import com.ptit.timtro.util.UserProfile;
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
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FileDir fileDir;

    @GetMapping("/user/get-by-id")
    public DataResponse<User> getById(@RequestParam("id") Integer id) {
        try {
            return new DataResponse<>(true, userService.get(id));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, null);
    }

    @GetMapping("/user/get-all")
    public DataResponse<List<User>> getAll() {
        try {
            return new DataResponse<>(true, userService.getAll());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, null);
    }

    @PostMapping("/user/change-password")
    public DataResponse<String> changePassword(@RequestParam("id") Integer id,
                                               @RequestParam("password") String newPassword) {
        try {
            User user = new User();
            user.setId(id);
            user.setPassword(newPassword);
            userService.changePassword(user);
            return new DataResponse<>(true, "OK");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, "Error");
    }

    @PostMapping("/user/delete")
    public DataResponse<String> delete(@RequestParam("id") Integer id) {
        try {
            userService.delete(id);
            return new DataResponse<>(true, "Đã xóa tài khoản");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, "Không xóa được tài khoản");
    }

    @PostMapping("/user/update")
    public DataResponse<String> update(@ModelAttribute UserProfile userProfile) {
        try {
            UserPrincipal userPrincipal = AdvancedSecurityContextHolder.getUserPrincipal();
            String role = userPrincipal.getAuthorities().stream().findFirst().get().toString();
            if (role.equals(Role.ADMIN.getAuthorityName())) {
                User user = userService.get(userProfile.getId());
                user.setName(userProfile.getName());
                user.setPhoneNumber(userProfile.getPhoneNumber());
                if (userProfile.getIsActived() != null) {
                    user.setIsActived(userProfile.getIsActived());
                }
                if (userProfile.getRole() != null) {
                    user.setRole(userProfile.getRole());
                }
                if (userProfile.getFile() != null) {
                    user.setImageUrl(userProfile.getFile().getOriginalFilename());
                    saveImage(userProfile.getFile(), userProfile.getId());
                }
                userService.update(user);
            } else {
                if (userPrincipal.getId().equals(userProfile.getId())) {
                    User user = userService.get(userProfile.getId());
                    user.setName(userProfile.getName());
                    user.setPhoneNumber(userProfile.getPhoneNumber());
                    if (userProfile.getFile() != null) {
                        user.setImageUrl(userProfile.getFile().getOriginalFilename());
                        saveImage(userProfile.getFile(), userProfile.getId());
                    }
                    userService.update(user);
                }
            }
            return new DataResponse<>(true, "Cập nhật tài khoản thành công");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, "Lõi");
    }

    private void saveImage(MultipartFile file, Integer userID) throws IOException {
        try {
            File uploadDir = new File(fileDir.getFileDir() + File.separator + "user" + File.separator + userID + File.separator);
            uploadDir.mkdirs();
            String uploadFilePath = fileDir.getFileDir() + File.separator + "user" + File.separator + userID + File.separator + file.getOriginalFilename();
            byte[] bytes = file.getBytes();
            Path path = Paths.get(uploadFilePath);
            Files.write(path, bytes);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}