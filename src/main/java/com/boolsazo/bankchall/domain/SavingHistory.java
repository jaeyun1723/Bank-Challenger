package com.boolsazo.bankchall.domain;

import java.sql.Timestamp;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Table(name = "saving_history")
public class SavingHistory {
    private int accountId;
    private int goalId;
    private int userId;
    private Timestamp saveDate;
}
