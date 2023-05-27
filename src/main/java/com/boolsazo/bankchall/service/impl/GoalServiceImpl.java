package com.boolsazo.bankchall.service.impl;

import com.boolsazo.bankchall.domain.Goal;
import com.boolsazo.bankchall.dto.GoalListResponse;
import com.boolsazo.bankchall.repository.GoalRepository;
import com.boolsazo.bankchall.repository.SavingHistoryRepository;
import com.boolsazo.bankchall.service.GoalService;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.boolsazo.bankchall.naver.NaverSearch;


@Service
public class GoalServiceImpl implements GoalService {

    @Autowired
    private GoalRepository goalRepository;
    @Autowired
    SavingHistoryRepository savingHistoryRepository;
    private final NaverSearch naverSearch;

    @Autowired
    public GoalServiceImpl(GoalRepository goalRepository, NaverSearch naverSearch) {
        this.goalRepository = goalRepository;
        this.naverSearch = naverSearch;
    }

    @Override
    public Goal registerGoal(Goal vo) {
        String searchResult = naverSearch.search("검색어");
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

    @Override
    public Goal showGoal(int goalId) {
        return goalRepository.findById(goalId).orElse(null);
    }


    @Override
    public GoalListResponse showAllGoal(int userId) {
        List<Goal> goals = goalRepository.findByUserId(userId);
        int count = goalRepository.countByUserId(userId);

        GoalListResponse goalListResponse = new GoalListResponse();
        goalListResponse.setGoals(goals);
        goalListResponse.setCount(count);

        HashMap<Integer, Integer> percentMap = new HashMap<>();
        for (Goal goal: goals) {
            int goalId = goal.getGoalId();

            int goalAmount = goalRepository.findGoalAmountByGoalId(goalId);
            int savingAmount = savingHistoryRepository.showSavingAmountByGoalId(goalId);
            int calcPercent = (int) Math.round(((savingAmount / (double) goalAmount)) * 100);
            int percent = (savingAmount > 0) ? ((calcPercent > 100) ? 100 : calcPercent) : 0;

            percentMap.put(goalId, percent);
        }
        goalListResponse.setPercentMap(percentMap);

        return goalListResponse;
    }

}
