package com.ptit.timtro.controller;

import com.ptit.timtro.model.User;
import com.ptit.timtro.service.UserService;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user/get-by-id")
    public DataResponse<User> getById(@RequestParam("id") Integer id) {
        return new DataResponse<>(true, userService.get(id));
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
}
