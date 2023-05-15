package com.boolsazo.bankchall.service.impl;

import com.boolsazo.bankchall.domain.Goal;
import com.boolsazo.bankchall.dto.GoalListResponse;
import com.boolsazo.bankchall.repository.GoalRepository;
import com.boolsazo.bankchall.service.GoalService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class GoalServiceImpl implements GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private GoalService goalService;

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
    public void deleteGoal(int goalId) {
        goalRepository.deleteById(goalId);
    }

    @Override
    public void updateGoal(Goal vo) {
        goalRepository.save(vo);
    }

    @GetMapping("/detail/{goalId}")
    public Goal showGoal(@PathVariable("goalId") int goalId) {
        return goalService.showGoal(goalId);
    }

    //    @Override
//    public GoalListResponse showAllGoal(int userId) {
//        List<Goal> optionalGoal = goalRepository.findAll();
//        GoalListResponse goalListResponse = new GoalListResponse();
//        int count = 3;
//        return (GoalListResponse) goalRepository.findAll();
//    }
    @Override
    public GoalListResponse showAllGoal(int userId) {
        List<Goal> goals = goalRepository.findByUserId(userId);
        int count = goalRepository.countByUserId(userId);

        GoalListResponse goalListResponse = new GoalListResponse();
        goalListResponse.setGoals(goals);
        goalListResponse.setCount(count);

        return goalListResponse;
    }


}
