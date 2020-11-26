package com.ptit.timtro.service;

import com.ptit.timtro.entity.CommentEntity;
import com.ptit.timtro.model.Comment;

import java.util.List;

public interface CommentService {
    CommentEntity create(Comment comment);

    void delete(Integer id);

    Comment getById(Integer id);

    List<Comment> getByPostId(Integer id);

    List<Comment> getAll();

    boolean checkExist(Integer id);
}
