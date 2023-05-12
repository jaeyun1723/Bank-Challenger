package com.boolsazo.bankchall.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Survey {

    private int userId;
    private int monthlyIncome;
    private int spendingRatio;
    private String occupation;
    private int savings;
    private int loan;
    private boolean isMarried;

}
