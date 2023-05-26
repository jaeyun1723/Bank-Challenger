package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.domain.GoalAccount;
import com.boolsazo.bankchall.dto.resultSet.GoalAccountResultSet;
import java.util.List;
import java.util.Optional;

public interface GoalAccountService {

    void registerGoalAccount(GoalAccount vo) throws Exception;

    GoalAccountResultSet showGoalWAccount(int goalId) throws Exception;

    GoalAccountResultSet showGoalSAccount(int goalId) throws Exception;

    void deleteByGoalId(int goalId) throws Exception;

    List<GoalAccount> findByGoalId(int goalId) throws Exception;

}
