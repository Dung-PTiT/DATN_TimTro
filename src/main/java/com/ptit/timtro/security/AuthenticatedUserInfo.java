package com.ptit.timtro.security;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthenticatedUserInfo {
    private String username;
    private String name;
    private Boolean vip;
    private String imageUrl;
}
