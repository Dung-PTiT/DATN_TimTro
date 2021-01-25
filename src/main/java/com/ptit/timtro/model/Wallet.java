package com.ptit.timtro.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ptit.timtro.entity.TopUpHistoryEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class Wallet {
    private Integer id;
    private Integer balance;
    private Date createTime;
    private User user;
}
