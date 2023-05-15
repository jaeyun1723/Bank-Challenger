package com.boolsazo.bankchall.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Entity
public class Survey {

    @Id
    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column(name = "monthly_income", nullable = false)
    private int monthlyIncome;

    @Column(name = "spending_ratio", nullable = false)
    private int spendingRatio;

    @Column(nullable = false)
    private String occupation;

    @Column(nullable = false)
    private int savings;

    @Column(nullable = false)
    private int loan;

    @Column(name = "is_married", nullable = false)
    private boolean isMarried;

}
