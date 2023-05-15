package com.boolsazo.bankchall.domain;

import com.boolsazo.bankchall.common.BaseTimeEntity;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
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
@Entity
public class Goal extends BaseTimeEntity {

    @Id
    @Column(name = "goal_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goalId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    private String category;

    @Column(name = "goal_name", nullable = false)
    private String goalName;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "goal_amount", nullable = false)
    private Long goalAmount;

    @Column(name = "saving_amount")
    private Long savingAmount;

    @Column(name = "goal_image")
    private String goalImage;

    @Column(columnDefinition = "BOOLEAN DEFAULT 0", nullable = false)
    private boolean isExpired;

    private String day;

    private Timestamp savingStartDate;
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime createDate;
    private Object customCreateDate;

    public void setCreateDate(LocalDateTime customCreateDate) {
        this.createDate = customCreateDate;
    }


    public Goal(Long userId, String category, String goalName, Long productId, Long goalAmount, Long savingAmount,
        String goalImage, boolean isExpired, String day, Timestamp savingStartDate, LocalDateTime createDate) {
        this.userId = userId;
        this.category = category;
        this.goalName = goalName;
        this.productId = productId;
        this.goalAmount = goalAmount;
        this.savingAmount = savingAmount;
        this.goalImage = goalImage;
        this.isExpired = isExpired;
        this.day = day;
        this.savingStartDate = savingStartDate;
        this.createDate = createDate;  // createDate 설정
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Goal goal = (Goal) obj;
        return Objects.equals(userId, goal.userId) &&
            Objects.equals(category, goal.category) &&
            Objects.equals(goalName, goal.goalName) &&
            Objects.equals(productId, goal.productId) &&
            Objects.equals(goalAmount, goal.goalAmount) &&
            Objects.equals(savingAmount, goal.savingAmount) &&
            Objects.equals(goalImage, goal.goalImage) &&
            Objects.equals(isExpired, goal.isExpired) &&
            Objects.equals(day, goal.day) &&
            Objects.equals(savingStartDate, goal.savingStartDate) &&
            Objects.equals(customCreateDate, goal.customCreateDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, category, goalName, productId, goalAmount, savingAmount, goalImage, isExpired, day, savingStartDate, customCreateDate);
    }





}
