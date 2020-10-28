package com.ptit.timtro.service;

import com.ptit.timtro.model.User;

public interface UserService {
    User getByUsername(String username);
}

