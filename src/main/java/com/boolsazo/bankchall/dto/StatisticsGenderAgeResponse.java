package com.boolsazo.bankchall.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class StatisticsGenderAgeResponse {
    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
    public static class GenderAge {
        private String age;
        private int man;
        private int woman;
    }
    List<GenderAge> result;

    public StatisticsGenderAgeResponse(List<GenderAge> result) {
        this.result = result;
    }
}
