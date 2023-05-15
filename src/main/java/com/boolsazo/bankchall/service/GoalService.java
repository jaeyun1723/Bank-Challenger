package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.domain.Goal;
import java.util.List;

public interface GoalService {

    Goal registerGoal(Goal vo);

    void deleteGoal(int goalId);

    void updateGoal(Goal vo);

    Goal showGoal(int goalId);

    List<Goal> showAllGoal(int userId);

}
