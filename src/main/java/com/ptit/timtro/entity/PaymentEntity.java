package com.ptit.timtro.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ptit.timtro.model.Post;
import com.ptit.timtro.model.PostVip;
import com.ptit.timtro.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "payment")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PaymentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "price")
    private Integer price;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "end_date", nullable = false)
    private Date endDate;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "description", columnDefinition = "text")
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id", nullable = false)
    private PostEntity postEntity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userEntity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "postVip_id", nullable = false)
    private PostVipEntity postVipEntity;
}
