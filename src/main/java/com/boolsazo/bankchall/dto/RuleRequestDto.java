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
@Schema(description = "규칙 등록 요청 DTO")
public class RuleRequestDto {
    @Schema(description = "사용자 PK")
    private int userId;

    @Schema(description = "목표 PK")
    private int goalId;

    @Schema(description = "출금 계좌 PK")
    private int withdrawAccountId;

    @Schema(description = "저축 계좌 PK")
    private int savingAccountId;

    @Schema(description = "주기")
    private String day;

    @Schema(description = "저축 금액")
    private int savingAmount;

    @Schema(description = "저축 자동이체 시작일")
    private String savingStartDate;

}
