package com.boolsazo.bankchall.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "goal_account")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(GoalAccountPK.class)
public class GoalAccount {
    @Id
    @Column(name = "account_id", nullable = false)
    private Long accountId;
    @Id
    @Column(name = "goal_id", nullable = false)
    private Long goalId;
}
