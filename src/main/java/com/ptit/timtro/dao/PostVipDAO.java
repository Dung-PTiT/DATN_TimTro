package com.ptit.timtro.dao;

import com.ptit.timtro.entity.PostVipEntity;

import java.util.List;

public interface PostVipDAO {

    void update(PostVipEntity postVipEntity);

    PostVipEntity getById(Integer id);

    List<PostVipEntity> getAll();
}
