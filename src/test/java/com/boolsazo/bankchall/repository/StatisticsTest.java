package com.boolsazo.bankchall.repository;

import com.boolsazo.bankchall.dto.resultSet.CategoryResultSet;
import com.boolsazo.bankchall.dto.resultSet.GenderAgeResultSet;
import com.boolsazo.bankchall.dto.resultSet.OccupationResultSet;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class StatisticsTest {
    @Autowired
    UserRepository userRepository;

    @Test
    @DisplayName("금융대사량에 따른 목표")
    void goalStatistic() {
        List<CategoryResultSet> result = userRepository.goalStatistics(1);
        for (CategoryResultSet cr: result) {
            System.out.println("카테고리: " + cr.getCategory());
            System.out.println("개수: " + cr.getCount());
        }
//
    }

    @Test
    @DisplayName("금융대사량에 따른 성별,나이 통계 보기")
    void goalStatistics() {
        String[] ageArr = {"0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-"};

        for (String age : ageArr) {
            GenderAgeResultSet result = userRepository.genderAgeStatistics(1, age);
            if (result != null) {
                System.out.println("성별: " + result.getGender());
                System.out.println("개수: " + result.getCount());
            }
        }
    }

    @Test
    @DisplayName("금융대사량에 따른 목표")
    void jobStatistics() {
        List<OccupationResultSet> result = userRepository.jobStatistics(1);
        for (OccupationResultSet cr: result) {
            System.out.println("카테고리: " + cr.getOccupation());
            System.out.println("개수: " + cr.getCount());
        }
//        System.out.println("직업: " + result.getOccupation());
//        System.out.println("개수: " + result.getCount());
    }
}
