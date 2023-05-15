package com.boolsazo.bankchall.domain;

import java.time.LocalDateTime;
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
@Table(name = "saving_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SavingHistory {

    @Id
    @Column(name = "saving_history_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int savingHistoryId;

    @Column(name = "account_id", nullable = false)
    private int accountId;

    @Column(name = "goal_id", nullable = false)
    private int goalId;

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column(name = "saving_date", columnDefinition = "TIMESTAMP")
    private LocalDateTime savingDate;

    @Column(name = "saving_amount")
    private int savingAmount;

    public SavingHistory(int accountId, int goalId, int userId, LocalDateTime savingDate,
        int savingAmount) {
        this.accountId = accountId;
        this.goalId = goalId;
        this.userId = userId;
        this.savingDate = savingDate;
        this.savingAmount = savingAmount;
    }
}
