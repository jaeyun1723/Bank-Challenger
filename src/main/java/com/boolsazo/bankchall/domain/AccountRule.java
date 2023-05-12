package com.boolsazo.bankchall.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountRule {

    @Id
    @Column(name = "account_id")
    private int accountId;
    @Id
    @Column(name = "rule_id")
    private int ruleId;
}
