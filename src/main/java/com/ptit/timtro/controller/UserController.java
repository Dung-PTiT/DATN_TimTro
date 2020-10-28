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

    @GetMapping("/user/get-by-username")
    public DataResponse<User> getByUsername(@RequestParam("username") String username) {
        return new DataResponse<>(true, userService.getByUsername(username));
    }
}
