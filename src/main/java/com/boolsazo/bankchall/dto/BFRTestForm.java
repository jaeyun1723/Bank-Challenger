package com.boolsazo.bankchall.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BFRTestForm {

    private int userId;
    private int investTendency;
    private int consumptionTendency;
    private int timeOrientation;

}
