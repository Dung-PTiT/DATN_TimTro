package com.ptit.timtro.util;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String name;
    private String phoneNumber;
    private String email;
}
