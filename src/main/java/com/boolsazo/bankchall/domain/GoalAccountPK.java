package com.boolsazo.bankchall.domain;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GoalAccountPK implements Serializable {

    private static final Long serialVersionUID = 1L;

    private int accountId;
    private int goalId;
}
