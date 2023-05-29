package com.boolsazo.bankchall.dto;

import com.boolsazo.bankchall.dto.resultSet.CategoryResultSet;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
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

    @Schema(description = "가장 많은 목표 유형", defaultValue = "0")
    private List<String> bestCategory = new ArrayList<>();
    @Schema(description = "목표 유형: 사보자", defaultValue = "0")
    private int buy = 0;
    @Schema(description = "목표 유형: 가보자", defaultValue = "0")
    private int go = 0;
    @Schema(description = "목표 유형: 모으자", defaultValue = "0")
    private int collect = 0;

    public StatisticsCategoryResponse(List<CategoryResultSet> result) {
        if (result != null) {
            Optional<CategoryResultSet> categoryResultSetOptional = result.stream().max(
                Comparator.comparing(CategoryResultSet::getCount));

            if (categoryResultSetOptional.isPresent()) {
                int maxCount = categoryResultSetOptional.get().getCount();
                for (CategoryResultSet crs : result) {
                    if (crs.getCategory().equals("사보자")) {
                        buy = crs.getCount();
                        if (buy == maxCount) {
                            bestCategory.add("사보자");
                        }
                    } else if (crs.getCategory().equals("가보자")) {
                        go = crs.getCount();
                        if (go == maxCount) {
                            bestCategory.add("가보자");
                        }
                    } else if (crs.getCategory().equals("모으자")) {
                        collect = crs.getCount();
                        if (collect == maxCount) {
                            bestCategory.add("모으자");
                        }
                    }
                }
            }
        }
    }
}
