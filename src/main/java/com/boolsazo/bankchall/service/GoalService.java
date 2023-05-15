package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.domain.Goal;
import com.boolsazo.bankchall.dto.GoalListResponse;

public interface GoalService {

    Goal registerGoal(Goal vo);

    void deleteGoal(int goalId);

    void updateGoal(Goal vo);

    Goal showGoal(int goalId);

    GoalListResponse showAllGoal(int userId);

}
