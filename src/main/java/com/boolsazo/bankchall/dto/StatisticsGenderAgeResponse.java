package com.boolsazo.bankchall.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Schema(description = "금융대사량에 따른 성별,나이 통계 응답 DTO")
public class StatisticsGenderAgeResponse {
    @Schema(description = "통계 결과값")
    List<GenderAge> result;

    @Schema(description = "가장 많은 나잇대")
    int bestAge;

    @Schema(description = "가장 많은 성별")
    int bestGender;

    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
    @Getter
    @Schema(description = "금융대사량에 따른 성별,나이 통계 응답 DTO")
    public static class GenderAge {
        @Schema(description = "나이대", defaultValue = "0")
        private String age;

        @Schema(description = "남성", defaultValue = "0")
        private int man = 0;

        @Schema(description = "여성", defaultValue = "0")
        private int woman = 0;
    }

    public StatisticsGenderAgeResponse(List<GenderAge> result) {
        this.result = result;
    }
}
