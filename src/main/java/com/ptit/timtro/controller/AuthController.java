package com.ptit.timtro.controller;

import com.ptit.timtro.entity.UserEntity;
import com.ptit.timtro.model.User;
import com.ptit.timtro.model.Wallet;
import com.ptit.timtro.security.*;
import com.ptit.timtro.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.ptit.timtro.service.UserService;
import com.ptit.timtro.service.WalletService;
import com.ptit.timtro.util.AuthTokenResponse;
import com.ptit.timtro.util.DataResponse;
import com.ptit.timtro.util.LoginRequest;
import com.ptit.timtro.util.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private WalletService walletService;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    @PostMapping("/auth/login")
    public DataResponse<AuthTokenResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            AuthTokenResponse tokenResponse = tokenProvider.createToken(authentication);
            return new DataResponse<>(true, tokenResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }
    }

    @GetMapping("/auth/logout")
    public DataResponse<String> logout() {
        return new DataResponse<>(true, "Logout");
    }

    @PostMapping("/auth/gen-pass")
    public DataResponse<String> genPass(@RequestParam("password") String password) {
        try {
            String newPass = passwordEncoder.encode(password);
            return new DataResponse<>(true, newPass);
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }
    }

    @GetMapping("/auth/get-current-user")
    public DataResponse<AuthenticatedUserInfo> getAuthenticatedUserInfo() {
        try {
            UserPrincipal userPrincipal = AdvancedSecurityContextHolder.getUserPrincipal();
            AuthenticatedUserInfo userInfo = new AuthenticatedUserInfo();
            userInfo.setId(userPrincipal.getId());
            userInfo.setName(userPrincipal.getName());
            userInfo.setUsername(userPrincipal.getUsername());
            userInfo.setImageUrl(userPrincipal.getImageUrl());
            userInfo.setRole(userPrincipal.getAuthorities().stream().findFirst().get().toString());
            userInfo.setCreateTime(userPrincipal.getCreateTime());
            userInfo.setEmail(userPrincipal.getEmail());
            userInfo.setPhoneNumber(userPrincipal.getPhoneNumber());
            userInfo.setWallet(userPrincipal.getWallet());
            return new DataResponse<>(true, userInfo);
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }
    }

    @PostMapping("/auth/register")
    public DataResponse<String> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {

            User user = userService.checkExistedUser(registerRequest.getEmail(), "local");
            if (user != null) {
                return new DataResponse<>(false, "Error");
            } else {
                User userNew = new User();
                userNew.setUsername(registerRequest.getUsername());
                userNew.setEmail(registerRequest.getEmail());
                userNew.setPassword(registerRequest.getPassword());
                userNew.setName(registerRequest.getName());
                userNew.setRole("ROLE_MEMBER");
                userNew.setCreateTime(new Date());
                userNew.setAuthProvider(AuthProvider.local);
                userNew.setIsActived(false);
                userNew.setPhoneNumber(registerRequest.getPhoneNumber());
                userNew.setImageUrl(null);

                Integer userId = userService.create(userNew);

                User userTmp = new User();
                userTmp.setId(userId);

                Wallet wallet = new Wallet();
                wallet.setBalance(0);
                wallet.setCreateTime(new Date());
                wallet.setUser(userTmp);

                walletService.create(wallet);
                return new DataResponse<>(true, "OK");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, "Error");
    }

}
