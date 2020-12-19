package com.ptit.timtro.util;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ptit.timtro.model.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class UserProfile extends User {

    private MultipartFile file;

    public UserProfile() {
        super();
    }
}
