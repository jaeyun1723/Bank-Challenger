package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.domain.Goal;
import com.boolsazo.bankchall.dto.resultSet.GoalAccountResultSet;
import com.boolsazo.bankchall.service.GoalAccountService;
import com.boolsazo.bankchall.service.GoalService;
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

    @Scheduled(fixedDelay = 1000* 60 * 60 * 24 )//* 60 * 60 * 24
    void AutomaticWithdrawal() {

        // 1. 목표 정보 가져오기
        List<Goal> goals = goalService.findAll();

        String today = Integer.toString(LocalDate.now().getDayOfMonth());
        for (Goal goal: goals) {
            // 2. 날짜가 맞으면 출금, 입금할 계좌 정보 가져오기
//            if (goal.getDay() != today) {
//                continue;
//            }

            int goalId = goal.getGoalId();
            GoalAccountResultSet goalWAccountInfo = null;
            String WAccountBankName = null;
            String WAccountNumMasked = null;
            GoalAccountResultSet goalSAccountInfo = null;
            String SAccountBankName = null;
            String SAccountNumMasked = null;

            try {
                goalWAccountInfo = goalAccountService.showGoalWAccount(goalId);
                if (goalWAccountInfo == null) {
                    continue;
                }
                WAccountBankName = goalWAccountInfo.getBank_Name();
                WAccountNumMasked = goalWAccountInfo.getAccount_Num_Masked();

                goalSAccountInfo = goalAccountService.showGoalSAccount(goalId);
                SAccountBankName = goalSAccountInfo.getBank_Name();
                SAccountNumMasked = goalSAccountInfo.getAccount_Num_Masked();

                // 3. API 호출하기
                System.out.println(WAccountBankName + " // " + WAccountNumMasked);
                System.out.println(SAccountBankName + " // " + SAccountNumMasked);
            } catch (Exception e) {
                System.out.println("자동 이체: 계좌 정보를 불러오는 과정에서 오류 발생");
            }

        }
    }

}
