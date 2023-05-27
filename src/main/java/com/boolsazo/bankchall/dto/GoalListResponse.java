package com.boolsazo.bankchall.dto;

import com.boolsazo.bankchall.domain.Goal;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.HashMap;
import java.util.List;

@Schema(description = "목표 List 응답 DTO")
public class GoalListResponse {
    @Schema(description = "목표 List")
    private List<Goal> result;

    @Schema(description = "목표 List 갯수")
    private int count;

    @Schema(description = "각 목표의 달성률")
    HashMap<Integer, Integer> percentMap;

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

    public void setPercentMap(HashMap<Integer, Integer> percentMap) {
        this.percentMap = percentMap;
    }

    public HashMap<Integer, Integer> getPercentMap() {
        return percentMap;
    }

}
