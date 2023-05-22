package com.boolsazo.bankchall.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum BFR {

    LRP("LRP", 40, 30, 20, 10),
    LRF("LRF", 30, 40, 20, 10),
    LIP("LIP", 10, 20, 50, 20),
    LIF("LIF", 15, 25, 40, 20),
    HRP("HRP", 20, 40, 10, 30),
    HRF("HRF", 10, 30, 40, 20),
    HIP("HIP", 42, 40, 18, 18),
    HIF("HIF", 30, 10, 50, 10);

    final String financialType;
    final int consumption;
    final int deposit;
    final int invest;
    final int fixedCost;

}
