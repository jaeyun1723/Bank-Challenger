package com.boolsazo.bankchall.repository;

import com.boolsazo.bankchall.domain.SavingHistory;
import com.boolsazo.bankchall.dto.resultSet.SavingHistoryResultSet;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SavingHistoryRepositoryTest {

    @Autowired
    SavingHistoryRepository savingHistoryRepository;

    @Test
    @DisplayName("입금 내역 등록하기")
    public void registerSavingHistory() {
        SavingHistory savingHistory = new SavingHistory(1, 1, 1, LocalDateTime.now(), 60000);
        savingHistoryRepository.save(savingHistory);
    }

    @Test
    @DisplayName("goal_id 일치하는 SavingHistory(입금내역 테이블)의 행 삭제하기")
    public void deleteAllByGoalId() {
        final int goalId = 1;
        savingHistoryRepository.deleteByGoalId(goalId);
    }


    @Test
    @DisplayName("해당 규칙의 입금 내역 조회(goal_id 일치)")
    public void showAllByGoalId() {
        final int goalId = 1;
        List<SavingHistoryResultSet> list = savingHistoryRepository.showAllByGoalId(goalId);
        System.out.println("saving_date: " + list.get(0).getSaving_Date());
        System.out.println("saving_amount: " + list.get(0).getSaving_Amount());
    }

    @Test
    @DisplayName("사용자의 총 입금 내역 조회(user_id 일치)")
    public void showAllByUserId() {
        final int userId = 1;
        List<SavingHistoryResultSet> list = savingHistoryRepository.showAllByUserId(userId);
        System.out.println("saving_date: " + list.get(0).getSaving_Date());
        System.out.println("saving_amount: " + list.get(0).getSaving_Amount());
    }
}