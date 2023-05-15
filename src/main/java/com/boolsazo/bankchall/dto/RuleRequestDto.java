package com.boolsazo.bankchall.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RuleRequestDto {

    private int userId;
    private int goalId;
    private int withdrawAccountId;
    private int savingAccountId;
    private String day;
    private int savingAmount;
    private String savingStartDate;

}
