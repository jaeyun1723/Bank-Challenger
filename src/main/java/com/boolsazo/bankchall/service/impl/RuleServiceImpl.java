package com.boolsazo.bankchall.service.impl;

import com.boolsazo.bankchall.domain.Goal;
import com.boolsazo.bankchall.domain.GoalAccount;
import com.boolsazo.bankchall.dto.RuleDetailResponse;
import com.boolsazo.bankchall.dto.RuleDetailResponse.SavingHistory;
import com.boolsazo.bankchall.dto.RuleRequestDto;
import com.boolsazo.bankchall.dto.resultSet.GoalAccountResultSet;
import com.boolsazo.bankchall.dto.resultSet.SavingHistoryResultSet;
import com.boolsazo.bankchall.repository.GoalAccountRepository;
import com.boolsazo.bankchall.repository.GoalRepository;
import com.boolsazo.bankchall.repository.SavingHistoryRepository;
import com.boolsazo.bankchall.service.RuleService;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RuleServiceImpl implements RuleService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private GoalAccountRepository goalAccountRepository;

    @Autowired
    private SavingHistoryRepository savingHistoryRepository;

    @Override
    public void registerRule(RuleRequestDto dto) throws Exception {
        // TODO: goalId로 목표 불러오기
        int goalId = dto.getGoalId();
        int withdrawAccountId = dto.getWithdrawAccountId();
        int savingAccountId = dto.getSavingAccountId();

        Goal goal = goalRepository.findById(goalId)
                        .orElseThrow(() -> new NoSuchElementException("Goal Not Found"));

        goal.setDay(dto.getDay());
        goal.setSavingAmount(dto.getSavingAmount());
        goal.setSavingStartDate(dto.getSavingStartDate());

        // TODO: 목표에 규칙 추가하기
        goalRepository.save(goal);

        // TODO: GoalAccount 테이블에 출금 GoalAccount(accountId, goalId) 추가
        GoalAccount goalWAccount = new GoalAccount(withdrawAccountId, goalId);
        goalAccountRepository.save(goalWAccount);

        // TODO: GoalAccount 테이블에 저축 GoalAccount(accountId, goalId) 추가
        GoalAccount goalSAccount = new GoalAccount(savingAccountId, goalId);
        goalAccountRepository.save(goalSAccount);
    }

    @Override
    public void deleteRule(int goalId) throws Exception {
        // TODO: goalId에 맞는 모든 규칙(day, savingAmount,savingStartDate)을 null로 변경
        Goal goal = goalRepository.findById(goalId)
                        .orElseThrow(() -> new NoSuchElementException("Goal Not Found"));
        goal.setDay(null);
        goal.setSavingAmount(0);
        goal.setSavingStartDate(null);

        // TODO: goal_id 일치하는 GoalAccount(계좌-목표 테이블) 행 삭제하기
        goalAccountRepository.deleteByGoalId(goalId);

        // TODO: goal_id 일치하는 SavingHistory(입금내역 테이블)의 행 삭제하기
        savingHistoryRepository.deleteByGoalId(goalId);
    }

    @Override
    public RuleDetailResponse showRule(int goalId) {
        if (goalAccountRepository.findByGoalId(goalId).isEmpty()) {
            throw new NoSuchElementException("존재하는 규칙이 없습니다.");
        }
        GoalAccountResultSet goalWAccount = goalAccountRepository.showGoalWAccount(goalId);

        GoalAccountResultSet goalSAccount = goalAccountRepository.showGoalSAccount(goalId);

        List<SavingHistory> savingHistoryList = new ArrayList<>();
        List<SavingHistoryResultSet> resultSetList = savingHistoryRepository.showAllByGoalId(
            goalId);

        for (SavingHistoryResultSet resultSet : resultSetList) {
            savingHistoryList.add(
                new SavingHistory(resultSet.getSaving_Amount(), resultSet.getSaving_Date()));
        }

        int goalAmount = goalRepository.findGoalAmountByGoalId(goalId);
        int savingAmount = savingHistoryRepository.showSavingAmountByGoalId(goalId);
        int calcPercent = (int) Math.round(((savingAmount / (double) goalAmount)) * 100);
        int percent = (savingAmount > 0) ? ((calcPercent > 100) ? 100 : calcPercent) : 0;

        RuleDetailResponse result = RuleDetailResponse.builder()
                                        .goalId(goalId)
                                        .goalAmount(goalAmount)
                                        .percent(percent)
                                        .withdrawInfo(new RuleDetailResponse.AccountInfo(
                                            goalWAccount.getAccount_Num_Masked(),
                                            goalWAccount.getBank_Name()))
                                        .savingInfo(new RuleDetailResponse.AccountInfo(
                                            goalSAccount.getAccount_Num_Masked(),
                                            goalSAccount.getBank_Name()))
                                        .savingHistory(savingHistoryList)
                                        .build();

        return result;
    }
}
