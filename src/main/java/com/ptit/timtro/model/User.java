package com.ptit.timtro.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ptit.timtro.security.AuthProvider;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
