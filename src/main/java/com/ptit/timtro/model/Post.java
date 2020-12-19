package com.ptit.timtro.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Post {
    private Integer id;
    private String title;
    private String content;
    private Integer price;
    private Integer acreage;
    private Integer view;
    private String address;
    private Boolean status;
    private Double latitude;
    private Double longitude;
    private Date createTime;
    private String phoneNumber;
    private List<Image> images;
    private User user;
    private String wardStr;
    private Ward ward;
    private String districtStr;
    private District district;
    private String provinceStr;
    private Province province;
    private List<Comment> comments;
    private List<Favorite> favorites;
    private String categoryStr;
    private Category category;
    private String tagsStr;
    private List<Tag> tags;
    private List<Payment> payments;
    private MultipartFile[] files;
}