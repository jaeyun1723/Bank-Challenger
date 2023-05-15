package com.boolsazo.bankchall.service.impl;

import com.boolsazo.bankchall.domain.Goal;
import com.boolsazo.bankchall.repository.GoalRepository;
import com.boolsazo.bankchall.service.GoalService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoalServiceImpl implements GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    public GoalServiceImpl(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    @Override
    public Goal registerGoal(Goal vo) {
        goalRepository.save(vo);
        return vo;
    }

    @Override
    public void deleteGoal(long goalId) {
        goalRepository.deleteById(goalId);
    }

    @Override
    public void updateGoal(Goal vo) {
        goalRepository.save(vo);
    }

    @Override
    public Goal showGoal(long goalId) {
        Optional<Goal> optionalGoal = goalRepository.findById(goalId);
        // Goal 객체가 존재하지 않는 경우에 대한 처리를 추가합니다.
        return optionalGoal.orElseThrow(
            () -> new IllegalArgumentException("Invalid goal Id:" + goalId));
    }

    @Override
    public List<Goal> showAllGoal(long userId) {

        return goalRepository.findAll();
    }
}
