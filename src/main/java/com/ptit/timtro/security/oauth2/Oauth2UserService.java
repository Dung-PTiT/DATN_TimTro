package com.ptit.timtro.security.oauth2;

import com.ptit.timtro.dao.UserDAO;
import com.ptit.timtro.dao.WalletDAO;
import com.ptit.timtro.entity.UserEntity;
import com.ptit.timtro.entity.WalletEntity;
import com.ptit.timtro.exception.OAuth2AuthenticationProcessingException;
import com.ptit.timtro.model.User;
import com.ptit.timtro.model.Wallet;
import com.ptit.timtro.security.AuthProvider;
import com.ptit.timtro.security.Role;
import com.ptit.timtro.security.UserPrincipal;
import com.ptit.timtro.service.MailService;
import com.ptit.timtro.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.text.DecimalFormat;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

@Service
@Transactional
public class Oauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private WalletDAO walletDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }

    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if (StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }
        String typeAuthProvider = oAuth2UserRequest.getClientRegistration().getRegistrationId();
        UserEntity userEntity = userDAO.checkExistedUser(oAuth2UserInfo.getEmail(), typeAuthProvider);
        if (userEntity != null) {
            userEntity = updateExistingUser(userEntity, oAuth2UserInfo);
        } else {
            userEntity = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);

            WalletEntity walletEntity = new WalletEntity();
            walletEntity.setBalance(0);
            walletEntity.setCreateTime(new Date());
            UserEntity userWallet = new UserEntity();
            userWallet.setId(userEntity.getId());
            walletEntity.setUserEntity(userWallet);
            walletDAO.create(walletEntity);

            userEntity.setWalletEntity(walletEntity);
        }
        return UserPrincipal.createInstance(userEntity).addAttributes(oAuth2User.getAttributes());
    }

    private UserEntity registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        try {
            UserEntity userEntity = new UserEntity();
            userEntity.setAuthProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
            userEntity.setProviderId(oAuth2UserInfo.getId());

            String username = UUID.randomUUID().toString();
            userEntity.setUsername(username);

            String password = new DecimalFormat("000000").format(new Random().nextInt(999999));
            userEntity.setPassword(passwordEncoder.encode(password));

            userEntity.setName(oAuth2UserInfo.getName());
            userEntity.setEmail(oAuth2UserInfo.getEmail());
            userEntity.setImageUrl(oAuth2UserInfo.getImageUrl());
            userEntity.setPhoneNumber("Chưa có");
            userEntity.setRole(Role.MEMBER);
            userEntity.setEmailVerified(true);
            Date date = new Date();
            userEntity.setCreateTime(date);

            return userDAO.create(userEntity);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private UserEntity updateExistingUser(UserEntity existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());

        return userDAO.update(existingUser);
    }
}
