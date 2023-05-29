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
        List<CategoryResultSet> result;
        try {
            result = userRepository.goalStatistics(userId);
        } catch (Exception e) {
            throw new Exception("통계 처리 중 에러", e);
        }

        return new StatisticsCategoryResponse(result);
    }

    @Override
    public StatisticsGenderAgeResponse genderAgeStatistics(int userId) {
        // 연령대
        String[] ageArr = {"0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-"};
        String[] ageStrArr = {"10대 이하", "10대", "20대", "30대", "40대", "50대", "60대 이상"};
        List<GenderAge> response = new ArrayList<>();

        for (int i = 0; i < ageStrArr.length; i++) {
            String age = ageArr[i];
            String ageStr = ageStrArr[i];
            StatisticsGenderAgeResponse.GenderAge genderAge = new StatisticsGenderAgeResponse.GenderAge();
            GenderAgeResultSet result = userRepository.genderAgeStatistics(userId, age);
            genderAge.setAge(ageStr);
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
        List<OccupationResultSet> result;
        try {
            result = userRepository.jobStatistics(userId);
        } catch (Exception e) {
            throw new Exception("통계 처리 중 에러", e);
        }

        return new StatisticsJobResponse(result);
    }
}
