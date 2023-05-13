package com.boolsazo.bankchall.domain;

import com.boolsazo.bankchall.common.BaseTimeEntity;
import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Goal extends BaseTimeEntity {

    @Id
    @Column(name = "goal_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int goalId;

    @Column(name = "user_id", nullable = false)
    private int userId;

    private String category;

    @Column(name = "goal_name", nullable = false)
    private String goalName;

    @Column(name = "product_id")
    private int productId;

    @Column(name = "goal_amount", nullable = false)
    private int goalAmount;

    @Column(name = "saving_amount")
    private int savingAmount;

    @Column(name = "goal_image")
    private String goalImage;

    @Column(columnDefinition = "BOOLEAN DEFAULT 0", nullable = false)
    private boolean isExpired;

    private String day;

    private Timestamp savingStartDate;
}
