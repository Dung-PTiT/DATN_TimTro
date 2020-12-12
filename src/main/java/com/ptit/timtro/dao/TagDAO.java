package com.ptit.timtro.dao;

import com.ptit.timtro.entity.TagEntity;
import com.ptit.timtro.model.Tag;

import java.util.List;

public interface TagDAO {
    void create(TagEntity tagEntity);

    void update(TagEntity tagEntity);

    void delete(Integer id);

    TagEntity getById(Integer id);

    List<TagEntity> getAll();
}
