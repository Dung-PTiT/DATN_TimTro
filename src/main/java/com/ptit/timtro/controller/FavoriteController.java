package com.ptit.timtro.controller;

import com.ptit.timtro.model.Favorite;
import com.ptit.timtro.model.Post;
import com.ptit.timtro.model.User;
import com.ptit.timtro.security.AdvancedSecurityContextHolder;
import com.ptit.timtro.security.UserPrincipal;
import com.ptit.timtro.service.FavoriteService;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;

@Repository
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;

    @PostMapping("/comment/create")
    public DataResponse<String> create(@RequestParam("content") String content,
                                       @RequestParam("postId") Integer postId) {
        Favorite favorite = new Favorite();

        Date date = new Date();
        favorite.setCreateTime(date);

        UserPrincipal userPrincipal = AdvancedSecurityContextHolder.getUserPrincipal();
        User user = new User();
        user.setId(userPrincipal.getId());
        favorite.setUser(user);

        Post post = new Post();
        post.setId(postId);
        favorite.setPost(post);

//        favoriteService.create(favorite);
        return new DataResponse<>(true, "OK");
    }

    @PostMapping("/favorite/get-all")
    public DataResponse<List<Favorite>> getAllFavorites() {
        return new DataResponse<>(true, favoriteService.getAll());
    }
}
