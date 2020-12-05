package com.ptit.timtro.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ptit.timtro.security.AuthProvider;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class User {
    private Integer id;
    private String username;
    private String password;
    private String name;
    private String email;
    private AuthProvider authProvider;
    private String imageUrl;
    private String role;
    private Boolean isActived;
    private String phoneNumber;
    private Date createTime;
    private Wallet wallet;
}
