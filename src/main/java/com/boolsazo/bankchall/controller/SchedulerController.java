package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.domain.Goal;
import com.boolsazo.bankchall.domain.SavingHistory;
import com.boolsazo.bankchall.dto.resultSet.GoalAccountResultSet;
import com.boolsazo.bankchall.dto.resultSet.SavingHistoryResultSet;
import com.boolsazo.bankchall.service.GoalAccountService;
import com.boolsazo.bankchall.service.GoalService;
import com.boolsazo.bankchall.service.SavingHistoryService;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class SchedulerController {

    @Autowired
    GoalService goalService;

    @Autowired
    GoalAccountService goalAccountService;

    @Autowired
    SavingHistoryService savingHistoryService;

    @Scheduled(fixedDelay = 1000* 60 * 60 * 24)
    void AutomaticWithdrawal() {

        List<Goal> goals = goalService.findByDay(Integer.toString(LocalDate.now().getDayOfMonth()));

        for (Goal goal: goals) {
            try {
                GoalAccountResultSet goalSAccountInfo = goalAccountService.showGoalSAccount(goal.getGoalId());
                List<SavingHistoryResultSet> resultSet = savingHistoryService.showSavingHistoryReultSet(goalSAccountInfo.getAccount_Id(),goal.getGoalId());
                boolean automaticDebitPayment = false;
                for (SavingHistoryResultSet savingDay : resultSet) {
                    if (savingDay.getSaving_Date().getMonth() == LocalDate.now().getMonth()) {
                        automaticDebitPayment = true;
                        break;
                    }
                }
                if (!automaticDebitPayment) {
                    SavingHistory vo = new SavingHistory(goalSAccountInfo.getAccount_Id(),
                        goal.getGoalId(), goal.getUserId(),
                        LocalDateTime.now(), goal.getSavingAmount());
                    savingHistoryService.registerSavingHistory(vo);
                }
            } catch (Exception e) {
                System.out.println("자동 이체: 계좌 정보를 불러오는 과정에서 오류 발생");
            }

        }
        
    }

}
