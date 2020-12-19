package com.ptit.timtro.controller;

import com.ptit.timtro.model.User;
import com.ptit.timtro.model.Wallet;
import com.ptit.timtro.security.*;
import com.ptit.timtro.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.ptit.timtro.service.MailService;
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
import java.text.DecimalFormat;
import java.util.Date;
import java.util.Random;

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

    @Autowired
    private MailService mailService;

    @PostMapping("/auth/check-account-active")
    public DataResponse<String> checkAccountActive(@RequestParam("username") String username) {
        try {
            boolean checkUserExist = userService.existsByUsername(username);
            if (checkUserExist) {
                User user = userService.getByUsername(username);
                if (user.getIsActived()) {
                    return new DataResponse<>(true, "OK");
                } else {
                    return new DataResponse<>(false, "Tài khoản chưa được xác thực");
                }
            } else {
                return new DataResponse<>(false, "Tài khoản không tồn tại");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, "Error");
    }

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
        }
        return new DataResponse<>(false, null);
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
        }
        return new DataResponse<>(false, null);
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
            userInfo.setIsActived(userPrincipal.getIsActived());
            userInfo.setWallet(userPrincipal.getWallet());
            return new DataResponse<>(true, userInfo);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, null);
    }

    @PostMapping("/auth/register")
    public DataResponse<String> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            boolean checkUserByUsername = userService.existsByUsername(registerRequest.getUsername());
            if (checkUserByUsername) {
                return new DataResponse<>(false, "Tên đăng nhập đã tồn tại");
            } else {
                User user = userService.checkExistedUser(registerRequest.getEmail(), "local");
                if (user != null) {
                    return new DataResponse<>(false, "Email đã tồn tại");
                } else {

                    String responseStr;

                    User userNew = new User();
                    userNew.setUsername(registerRequest.getUsername());
                    userNew.setEmail(registerRequest.getEmail());
                    userNew.setPassword(registerRequest.getPassword());
                    userNew.setName(registerRequest.getName());
                    userNew.setCreateTime(new Date());
                    userNew.setAuthProvider(AuthProvider.local);
                    userNew.setPhoneNumber(registerRequest.getPhoneNumber());
                    userNew.setImageUrl(null);
                    if (registerRequest.getRole() != null) {
                        userNew.setRole(registerRequest.getRole());
                        userNew.setIsActived(true);

                        responseStr = "Tạo tài khoản thành công";
                    } else {
                        String emailVerifyCode = new DecimalFormat("000000").format(new Random().nextInt(999999));
                        (new Thread(() -> mailService.sendCodeToMail(registerRequest.getEmail(), emailVerifyCode))).start();
                        userNew.setEmailVerifyCode(emailVerifyCode);
                        userNew.setRole("ROLE_MEMBER");
                        userNew.setIsActived(false);

                        responseStr = "Đã tạo tài khoản. Hãy xác thực";
                    }

                    Integer userId = userService.create(userNew);

                    User userTmp = new User();
                    userTmp.setId(userId);

                    Wallet wallet = new Wallet();
                    wallet.setBalance(0);
                    wallet.setCreateTime(new Date());
                    wallet.setUser(userTmp);
                    walletService.create(wallet);

                    return new DataResponse<>(true, responseStr);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, "Lỗi");
    }

    @PostMapping("/auth/email-verify")
    public DataResponse<String> verifyEmail(@RequestParam("email") String email,
                                            @RequestParam("code") String code) {
        try {
            User userCheck = userService.checkExistedUser(email, "local");
            if (userCheck == null) {
                return new DataResponse<>(false, "Tài khoản không tồn tại");
            } else {
                User user = userService.getByEmailAndTypeProvider(email, "local");
                if (user.getIsActived()) {
                    return new DataResponse<>(false, "Tài khoản đã được xác thực");
                } else {
                    if (user.getEmailVerifyCode().equals(code)) {
                        user.setIsActived(true);
                        userService.updateStatus(user);
                        return new DataResponse<>(true, "Xác thực tài khoản thành công");
                    } else {
                        return new DataResponse<>(false, "Mã xác nhận không đúng");
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, null);
    }

    @PostMapping("/auth/gen-code-email-verify")
    public DataResponse<String> genCodeVerifyForgetAccount(@RequestParam("email") String email) {
        try {
            User userCheck = userService.checkExistedUser(email, "local");
            if (userCheck == null) {
                return new DataResponse<>(false, "Tài khoản không tồn tại");
            } else {
                String emailVerifyCode = new DecimalFormat("000000").format(new Random().nextInt(999999));
                (new Thread(() -> mailService.sendCodeToMail(email, emailVerifyCode))).start();
                userCheck.setEmailVerifyCode(emailVerifyCode);
                userService.updateEmailVerifyCode(userCheck);
                return new DataResponse<>(true, "Đã tạo mã xác nhận. Truy cập mail để lấy mã");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, null);
    }

    @PostMapping("/auth/get-account-forget")
    public DataResponse<String> getAccountForget(@RequestParam("email") String email,
                                                 @RequestParam("code") String code) {
        try {
            User userCheck = userService.checkExistedUser(email, "local");
            if (userCheck == null) {
                return new DataResponse<>(false, "Tài khoản không tồn tại");
            } else {
                User user = userService.getByEmailAndTypeProvider(email, "local");
                if (user.getEmailVerifyCode().equals(code)) {
                    user.setPassword(code);
                    userService.changePassword(user);
                    (new Thread(() -> mailService.sendForgetAccount(email, user.getUsername(), code))).start();
                    return new DataResponse<>(true, "Lấy lại tài khoản thành công");
                } else {
                    return new DataResponse<>(false, "Mã xác nhận không đúng");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DataResponse<>(false, null);
    }
}
