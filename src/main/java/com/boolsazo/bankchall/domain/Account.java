package com.boolsazo.bankchall.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "account")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id", nullable = false)
    private Long accountId;
    @Column(name = "user_id", nullable = false)
    private Long userId;
    @Column(name = "account_num_masked", nullable = false)
    private String accountNumMasked;
    @Column(name = "bank_name", nullable = false)
    private String bankName;
    private boolean isUsed = false;
    private int type;

    public Account(Long userId, String accountNumMasked, String bankName, boolean isUsed,
        int type) {
        this.userId = userId;
        this.accountNumMasked = accountNumMasked;
        this.bankName = bankName;
        this.isUsed = isUsed;
        this.type = type;
    }
}
