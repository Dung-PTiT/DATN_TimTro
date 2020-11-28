package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.CommentDAO;
import com.ptit.timtro.entity.CommentEntity;
import com.ptit.timtro.entity.PostEntity;
import com.ptit.timtro.entity.UserEntity;
import com.ptit.timtro.model.Comment;
import com.ptit.timtro.model.User;
import com.ptit.timtro.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentDAO commentDAO;

    @Override
    public CommentEntity create(Comment comment) {
        CommentEntity commentEntity = new CommentEntity();

        commentEntity.setContent(comment.getContent());

        Date date = comment.getCreateTime();

        commentEntity.setCreateTime(date);

        UserEntity userEntity = new UserEntity();
        userEntity.setId(comment.getUser().getId());
        commentEntity.setUserEntity(userEntity);

        PostEntity postEntity = new PostEntity();
        postEntity.setId(comment.getPost().getId());
        commentEntity.setPostEntity(postEntity);

        return commentDAO.create(commentEntity);
    }

    @Override
    public void delete(Integer id) {
        commentDAO.delete(id);
    }

    @Override
    public Comment getById(Integer id) {
        CommentEntity commentEntity = commentDAO.getById(id);
        return entityToModel(commentEntity);
    }

    @Override
    public List<Comment> getByPostId(Integer id) {
        List<CommentEntity> commentEntities = commentDAO.getByPostId(id);
        return commentEntities.stream().map(this::entityToModel).collect(Collectors.toList());
    }

    @Override
    public List<Comment> getAll() {
        List<CommentEntity> commentEntities = commentDAO.getAll();
        return commentEntities.stream().map(this::entityToModel).collect(Collectors.toList());
    }

    @Override
    public boolean checkExist(Integer id) {
        return commentDAO.checkExist(id);
    }

    private Comment entityToModel(CommentEntity commentEntity) {
        Comment comment = new Comment();
        comment.setId(commentEntity.getId());
        comment.setContent(commentEntity.getContent());
        comment.setCreateTime(commentEntity.getCreateTime());

        UserEntity userEntity = commentEntity.getUserEntity();
        User user = new User();
        user.setId(userEntity.getId());
        user.setName(userEntity.getName());
        user.setImageUrl(userEntity.getImageUrl());
        comment.setUser(user);

        comment.setPost(null);
        return comment;
    }
}
