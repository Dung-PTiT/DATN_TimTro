package com.ptit.timtro.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostVip {
    private Integer id;
    private String name;
    private Integer vipLevel;
    private Integer dayPrice;
    private Integer weekPrice;
    private Integer monthPrice;
    private Integer yearPrice;
    private String description;
}
