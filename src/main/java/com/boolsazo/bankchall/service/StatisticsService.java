package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.dto.StatisticsCategoryResponse;
import com.boolsazo.bankchall.dto.StatisticsGenderAgeResponse;
import com.boolsazo.bankchall.dto.StatisticsJobResponse;

public interface StatisticsService {
    StatisticsCategoryResponse goalStatistics(int userId) throws Exception;

    StatisticsGenderAgeResponse genderAgeStatistics(int userId);

    StatisticsJobResponse StatisticsJobResponse(int userId) throws Exception;
}
