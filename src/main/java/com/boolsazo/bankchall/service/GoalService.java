package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.domain.Goal;
import java.util.List;

public interface GoalService {

    Goal registerGoal(Goal vo);

    void deleteGoal(long goalId);

    void updateGoal(Goal vo);

    Goal showGoal(long goalId);

    List<Goal> showAllGoal(long userId);

}
