package com.boolsazo.bankchall.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Rule {

    private int ruleId;
    private String day;
    private int perMonth;
}
