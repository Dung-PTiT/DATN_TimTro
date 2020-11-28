package com.ptit.timtro.controller;

import com.ptit.timtro.security.AdvancedSecurityContextHolder;
import com.ptit.timtro.security.AuthenticatedUserInfo;
import com.ptit.timtro.security.TokenProvider;
import com.ptit.timtro.security.UserPrincipal;
import com.ptit.timtro.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.ptit.timtro.util.AuthTokenResponse;
import com.ptit.timtro.util.DataResponse;
import com.ptit.timtro.util.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class AuthController {

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
            return new DataResponse<>(true, userInfo);
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }
    }

//    @PostMapping("/auth/signup")
//    public DataResponse<String> registerUser(@Valid @RequestBody SignUpReq signUpReq) {
//        if (userService.existsByEmail(signUpReq.getEmail())) {
//            throw new BadRequestException("Email address already in use.");
//        }
//        if (userService.existsByEmail(signUpReq.getEmail())) {
//            throw new BadRequestException("Email address already in use.");
//        }
//        UserDTO user = new UserDTO();
//        user.setUsername(signUpReq.getUsername());
//        user.setName(signUpReq.getName());
//        user.setEmail(signUpReq.getEmail());
//        user.setPassword(signUpReq.getPassword());
//        user.setAuthProvider(AuthProvider.local);
//        userService.create(user);
//        return new DataResponse<>(true, "User registered successfully!");
//    }

}
