package com.ptit.timtro.service;

import com.ptit.timtro.model.Tag;
import io.swagger.models.auth.In;

import java.util.List;

public interface TagService {
    void create(Tag tag);

    void update(Tag tag);

    void delete(Integer id);

    Tag getById(Integer id);

    List<Tag> getAll();
}
