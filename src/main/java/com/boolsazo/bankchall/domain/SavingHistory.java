package com.boolsazo.bankchall.domain;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class SavingHistory {
    private int accountId;
    private int ruleId;
    private int userOd;
    private Timestamp saveDate;
}
