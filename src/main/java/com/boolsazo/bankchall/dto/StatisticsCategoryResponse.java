package com.boolsazo.bankchall.dto;

import com.boolsazo.bankchall.dto.resultSet.CategoryResultSet;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "금융대사량에 따른 목표 응답 DTO")
public class StatisticsCategoryResponse {
    @Schema(description = "목표 유형: 사보자", defaultValue = "0")
    private int buy = 0;
    @Schema(description = "목표 유형: 가보자", defaultValue = "0")
    private int go = 0;
    @Schema(description = "목표 유형: 모으자", defaultValue = "0")
    private int collect = 0;

    public StatisticsCategoryResponse(List<CategoryResultSet> result) {
        for (CategoryResultSet crs : result) {
            if (crs.getCategory().equals("buy")) {
                this.buy = crs.getCount();
            } else if (crs.getCategory().equals("go")) {
                this.go = crs.getCount();
            } else if (crs.getCategory().equals("collect")) {
                this.collect = crs.getCount();
            }
        }
    }
}
