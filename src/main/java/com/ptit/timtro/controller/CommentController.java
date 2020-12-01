package com.ptit.timtro.controller;

import com.ptit.timtro.dao.CommentDAO;
import com.ptit.timtro.entity.CommentEntity;
import com.ptit.timtro.model.Comment;
import com.ptit.timtro.model.Post;
import com.ptit.timtro.model.User;
import com.ptit.timtro.security.AdvancedSecurityContextHolder;
import com.ptit.timtro.security.UserPrincipal;
import com.ptit.timtro.service.CommentService;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private CommentDAO commentDAO;

    @PostMapping("/comment/create")
    public DataResponse<String> create(@RequestParam("content") String content,
                                       @RequestParam("postId") Integer postId) {
        try {
            Comment comment = new Comment();

            comment.setContent(content);

            Date date = new Date();
            comment.setCreateTime(date);

            UserPrincipal userPrincipal = AdvancedSecurityContextHolder.getUserPrincipal();
            User user = new User();
            user.setId(userPrincipal.getId());
            comment.setUser(user);

            Post post = new Post();
            post.setId(postId);
            comment.setPost(post);

            commentService.create(comment);
            return new DataResponse<>(true, "OK");
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, "Error");
        }
    }

    @PostMapping("/comment/delete")
    public DataResponse<String> deleteComment(@RequestParam("commentId") Integer commentId) {
        try {
            commentService.delete(commentId);
            return new DataResponse<>(true, "OK");
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, "Error");
        }
    }

    @PostMapping("/comment/check-exist")
    public Boolean checkComment(@RequestParam("id") Integer id) {
        try {
            return commentDAO.checkExist(id);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @GetMapping("/comment/get-by-post-id")
    public DataResponse<List<Comment>> getCommentByPostId(@RequestParam("id") Integer id) {
        try {
            return new DataResponse<>(true, commentService.getByPostId(id));
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }
    }

    @GetMapping("/comment/get-by-user-id")
    public DataResponse<List<Comment>> getCommentByUserId(@RequestParam("id") Integer id) {
        try {
            return new DataResponse<>(true, commentService.getByUserId(id));
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }
    }

    @GetMapping("/comment/get-all")
    public DataResponse<List<Comment>> getAllComments() {
        try {
            return new DataResponse<>(true, commentService.getAll());
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }
    }

}
