package com.ptit.timtro.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "post")
public class PostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "content", columnDefinition = "blob")
    private String content;

    @Column(name = "create_time", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date createDate;

    @Column(name = "end_time", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Column(name = "price", nullable = false)
    private Integer price;

    @Column(name = "acreage", nullable = false)
    private Integer acreage;

    @Column(name = "view", nullable = false)
    private Integer view;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @Column(name = "status", nullable = false, length = 255)
    private String status;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "postEntity")
    private Set<ImageEntity> images;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userEntity;
}
