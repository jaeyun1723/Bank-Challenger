package com.boolsazo.bankchall.dto;

import com.boolsazo.bankchall.domain.Goal;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "목표 List 응답 DTO")
public class GoalListResponse {
    @Schema(description = "목표 List")
    private List<Goal> result;

    @Schema(description = "목표 List 갯수")
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
