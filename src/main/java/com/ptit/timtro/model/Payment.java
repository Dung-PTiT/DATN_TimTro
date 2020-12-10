package com.ptit.timtro.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Payment {
    private Integer id;
    private Integer price;
    private Date startDate;
    private Date endDate;
    private String description;
    private Boolean status;
    private Post post;
    private User user;
    private PostVip postVip;
}
