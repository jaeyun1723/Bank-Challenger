package com.boolsazo.bankchall.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsJobResponse {
    private int inoccupation = 0;
    private int student = 0;
    private int employee = 0;
    private int ownerOperator = 0;
    private int specializedJob = 0;
    private int freelancer = 0;
    private int civilServant = 0;
    private int engineer = 0;
    private int service = 0;
}
