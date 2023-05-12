package com.boolsazo.bankchall.domain;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Goal {

    @Id
    @Column(name = "goal_id")
    private int goalId;
    private int userId;
    private int ruleId;
    private String category;
    private int productId;
    private String goalName;
    private int goalAmount;
    private int autoAmount;

    private Timestamp startDate;

    private boolean isExpired;

    private String image;

    private Timestamp createDate;

}
