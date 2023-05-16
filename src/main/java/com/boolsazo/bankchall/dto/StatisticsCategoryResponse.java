package com.boolsazo.bankchall.dto;

import com.boolsazo.bankchall.dto.resultSet.CategoryResultSet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsCategoryResponse {

    private int buy = 0;
    private int go = 0;
    private int collect = 0;

    public StatisticsCategoryResponse(CategoryResultSet result) {
        if (result.getCategory().equals("buy")) {
            this.buy = result.getCount();
        } else if (result.getCategory().equals("go")) {
            this.go = result.getCount();
        } else if (result.getCategory().equals("collect")) {
            this.collect = result.getCount();
        }
    }
}
