package com.boolsazo.bankchall.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "금융대사량에 따른 직종 통계 응답 DTO")
public class StatisticsJobResponse {
    @Schema(description = "무직", defaultValue = "0")
    private int inoccupation = 0;

    @Schema(description = "학생", defaultValue = "0")
    private int student = 0;

    @Schema(description = "회사원", defaultValue = "0")
    private int employee = 0;

    @Schema(description = "자영업자", defaultValue = "0")
    private int ownerOperator = 0;

    @Schema(description = "전문직", defaultValue = "0")
    private int specializedJob = 0;

    @Schema(description = "프리랜서", defaultValue = "0")
    private int freelancer = 0;

    @Schema(description = "공무원", defaultValue = "0")
    private int civilServant = 0;

    @Schema(description = "엔지니어", defaultValue = "0")
    private int engineer = 0;

    @Schema(description = "서비스직", defaultValue = "0")
    private int service = 0;
}
