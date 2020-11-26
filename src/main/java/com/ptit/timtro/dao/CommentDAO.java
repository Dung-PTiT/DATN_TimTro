package com.ptit.timtro.dao;

import com.ptit.timtro.entity.CommentEntity;
import com.ptit.timtro.model.Comment;

import java.util.List;

public interface CommentDAO {
    CommentEntity create(CommentEntity commentEntity);

    void delete(Integer integer);

    CommentEntity getById(Integer id);

    List<CommentEntity> getByPostId(Integer id);

    List<CommentEntity> getAll();

    boolean checkExist(Integer id);
}
