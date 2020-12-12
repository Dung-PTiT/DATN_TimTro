package com.ptit.timtro.service;

import com.ptit.timtro.model.PostVip;

import java.util.List;

public interface PostVipService {
    void update(PostVip postVip);

    PostVip getById(Integer id);

    List<PostVip> getAll();
}
