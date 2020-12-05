package com.ptit.timtro.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "post_vip")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostVipEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "day_price", nullable = false)
    private Integer dayPrice;

    @Column(name = "week_price", nullable = false)
    private Integer weekPrice;

    @Column(name = "month_price", nullable = false)
    private Integer monthPrice;

    @Column(name = "year_price", nullable = false)
    private Integer yearPrice;

    @Column(name = "description", columnDefinition = "blob")
    private String description;
}