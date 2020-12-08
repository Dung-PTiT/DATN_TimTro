package com.ptit.timtro.security;

import com.ptit.timtro.entity.UserEntity;
import com.ptit.timtro.entity.WalletEntity;
import com.ptit.timtro.model.Wallet;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.*;

@Getter
@Setter
public class UserPrincipal implements UserDetails, OAuth2User {

    private Integer id;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String name;
    private Boolean vip;
    private String imageUrl;
    private Date createTime;
    private Wallet wallet;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public static UserPrincipal createInstance(UserEntity userEntity) {
        UserPrincipal userPrincipal = new UserPrincipal();
        userPrincipal.setId(userEntity.getId());
        userPrincipal.setUsername(userEntity.getUsername());
        userPrincipal.setPassword(userEntity.getPassword());
        userPrincipal.setName(userEntity.getName());
        userPrincipal.setEmail(userEntity.getEmail());
        userPrincipal.setPhoneNumber(userEntity.getPhoneNumber());
        userPrincipal.setCreateTime(userEntity.getCreateTime());

        WalletEntity walletEntity = userEntity.getWalletEntity();
        Wallet wallet = new Wallet();
        wallet.setBalance(walletEntity.getBalance());
        wallet.setCreateTime(walletEntity.getCreateTime());
        userPrincipal.setWallet(wallet);

        if (userEntity.getImageUrl() != null) userPrincipal.setImageUrl(userEntity.getImageUrl());
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(userEntity.getRole().getAuthorityName()));
        userPrincipal.setAuthorities(authorities);
        return userPrincipal;
    }

    public UserPrincipal addAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
        return this;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
