package com.ptit.timtro.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ptit.timtro.security.AuthProvider;
import com.ptit.timtro.security.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "image_url", columnDefinition = "text")
    private String imageUrl;

    @Column(name = "email_verified", nullable = false)
    private Boolean emailVerified = false;

    @Column(name = "email_verified_code")
    private String emailVerifiedCode;

    @Column(name = "provider_id")
    private String providerId;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "auth_provider")
    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_time", nullable = false)
    private Date createTime;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "userEntity")
    private List<PostEntity> posts;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "userEntity")
    private List<CommentEntity> comments;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "userEntity")
    private List<FavoriteEntity> favorites;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "userEntity")
    private List<ViewHistoryEntity> viewHistories;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "userEntity")
    private WalletEntity walletEntity;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "userEntity")
    private List<PaymentEntity> payments;
}

