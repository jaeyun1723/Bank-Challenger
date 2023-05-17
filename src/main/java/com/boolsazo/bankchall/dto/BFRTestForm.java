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
public class BFRTestForm {
    @Schema(description = "사용자 PK")
    private int userId;

    @Schema(description = "투자 비율")
    private int investTendency;

    @Schema(description = "소비 비율")
    private int consumptionTendency;

    @Schema(description = "시간 지향성")
    private int timeOrientation;

}
