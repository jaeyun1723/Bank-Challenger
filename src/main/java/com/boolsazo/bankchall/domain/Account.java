package com.boolsazo.bankchall.domain;

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
    private Long accountId;
    private Long userId;
    private String accountNumMasked;
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
