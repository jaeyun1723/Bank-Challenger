package com.boolsazo.bankchall.service.impl;

import com.boolsazo.bankchall.dto.StatisticsCategoryResponse;
import com.boolsazo.bankchall.dto.StatisticsGenderAgeResponse;
import com.boolsazo.bankchall.dto.StatisticsGenderAgeResponse.GenderAge;
import com.boolsazo.bankchall.dto.StatisticsJobResponse;
import com.boolsazo.bankchall.dto.resultSet.CategoryResultSet;
import com.boolsazo.bankchall.dto.resultSet.GenderAgeResultSet;
import com.boolsazo.bankchall.dto.resultSet.OccupationResultSet;
import com.boolsazo.bankchall.repository.UserRepository;
import com.boolsazo.bankchall.service.StatisticsService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatisticsServiceImpl implements StatisticsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public StatisticsCategoryResponse goalStatistics(int userId) throws Exception {
        CategoryResultSet result;
        try {
            result = userRepository.goalStatistics(userId);
        } catch (Exception e) {
            throw new Exception("통계 처리 중 에러" , e);
        }

        return new StatisticsCategoryResponse(result);
    }

    @Override
    public StatisticsGenderAgeResponse genderAgeStatistics(int userId) {
        // 연령대
        String[] ageArr = {"0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-"};
        List<GenderAge> response = new ArrayList<>();
        for (String age : ageArr) {
            StatisticsGenderAgeResponse.GenderAge genderAge = new StatisticsGenderAgeResponse.GenderAge();
            GenderAgeResultSet result = userRepository.genderAgeStatistics(userId, age);

            genderAge.setAge(age);
            if (result != null) {
                if (result.getGender().equals("M")) {
                    genderAge.setMan(result.getCount());
                } else {
                    genderAge.setWoman(result.getCount());
                }
            }

            response.add(genderAge);
        }

        return new StatisticsGenderAgeResponse(response);
    }

    @Override
    public StatisticsJobResponse StatisticsJobResponse(int userId) throws Exception {
        OccupationResultSet result;
        try {
            result = userRepository.jobStatistics(userId);
        } catch (Exception e) {
            throw new Exception("통계 처리 중 에러" , e);
        }

        return null;
    }
}
