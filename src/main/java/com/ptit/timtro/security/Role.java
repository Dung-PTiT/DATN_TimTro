package com.ptit.timtro.security;

public enum Role {
    ADMIN, MEMBER;

    public String getAuthorityName() {
        return "ROLE_" + name();
    }
}
