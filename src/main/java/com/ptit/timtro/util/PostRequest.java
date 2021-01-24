package com.ptit.timtro.util;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ptit.timtro.model.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class PostRequest extends Post {
    private String wardStr;
    private String districtStr;
    private String provinceStr;
    private List<Comment> comments;
    private List<Favorite> favorites;
    private String categoryStr;
    private String tagsStr;
    private List<Payment> payments;
    private MultipartFile[] files;

    public PostRequest() {
        super();
    }
}
