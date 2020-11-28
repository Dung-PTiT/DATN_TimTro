package com.ptit.timtro.controller;

import com.ptit.timtro.model.Favorite;
import com.ptit.timtro.model.Post;
import com.ptit.timtro.model.User;
import com.ptit.timtro.security.AdvancedSecurityContextHolder;
import com.ptit.timtro.security.UserPrincipal;
import com.ptit.timtro.service.FavoriteService;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;

    @PostMapping("/favorite/create")
    public DataResponse<Boolean> create(@RequestParam("postId") Integer postId) {
        try {
            UserPrincipal userPrincipal = AdvancedSecurityContextHolder.getUserPrincipal();
            boolean check = favoriteService.checkPostIdUserId(postId, userPrincipal.getId());
            if (!check) {
                try {
                    Favorite favorite = new Favorite();

                    Date date = new Date();
                    favorite.setCreateTime(date);

                    User user = new User();
                    user.setId(userPrincipal.getId());
                    favorite.setUser(user);

                    Post post = new Post();
                    post.setId(postId);
                    favorite.setPost(post);

                    favoriteService.create(favorite);
                    return new DataResponse<>(true, true);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return new DataResponse<>(false, false);
            } else {
                try {
                    favoriteService.delete(favoriteService.getByPostIdUserId(postId, userPrincipal.getId()).getId());
                    return new DataResponse<>(true, false);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return new DataResponse<>(false, false);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, false);
    }

    @GetMapping("/favorite/get-by-user-id")
    public DataResponse<List<Favorite>> getFavoriteByUserId(@RequestParam("userId") Integer userId) {
        try {
            return new DataResponse<>(true, favoriteService.getByUserId(userId));
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }
    }

    @PostMapping("/favorite/get-all")
    public DataResponse<List<Favorite>> getAllFavorites() {
        try {
            return new DataResponse<>(true, favoriteService.getAll());
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }

    }
}
