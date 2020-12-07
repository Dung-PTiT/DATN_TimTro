package com.ptit.timtro.controller;

import com.ptit.timtro.model.PostVip;
import com.ptit.timtro.service.PostVipService;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PostVipController {

    @Autowired
    private PostVipService postVipService;

    @GetMapping("/post-vip/get-all")
    public DataResponse<List<PostVip>> getAllPostVip() {
        try {
            return new DataResponse<>(true, postVipService.getAll());
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }
    }
}
