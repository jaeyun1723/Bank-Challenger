package com.boolsazo.bankchall.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_oauth")
public class UserOauth {
    @Id
    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column(name = "user_seq_no", nullable = false)
    private String userSeqNo ;

    @Column(name = "access_token", nullable = false)
    private String accessToken;

}
