package com.boolsazo.bankchall.dto;

import com.boolsazo.bankchall.domain.Goal;

import java.util.List;

public class GoalListResponse {
    private List<Goal> result;
    private int count;

    public void setGoals(List<Goal> goals) {
        this.result = goals;
    }

    public List<Goal> getGoals() {
        return result;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getCount() {
        return count;
    }

}
