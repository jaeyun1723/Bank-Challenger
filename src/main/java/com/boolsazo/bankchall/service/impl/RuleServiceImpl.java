package com.boolsazo.bankchall.service.impl;

import com.boolsazo.bankchall.domain.Goal;
import com.boolsazo.bankchall.domain.GoalAccount;
import com.boolsazo.bankchall.dto.RuleDetailResponse;
import com.boolsazo.bankchall.dto.RuleRequestDto;
import com.boolsazo.bankchall.dto.resultSet.GoalAccountResultSet;
import com.boolsazo.bankchall.repository.GoalAccountRepository;
import com.boolsazo.bankchall.repository.GoalRepository;
import com.boolsazo.bankchall.repository.SavingHistoryRepository;
import com.boolsazo.bankchall.service.RuleService;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.NoSuchElementException;
import java.util.Optional;
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

        // TODO: Goal 테이블에서 savingStartDate 타입을 String으로 변경하기
        String savingStartDate = dto.getSavingStartDate();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime savingStartDateTime = LocalDateTime.parse(savingStartDate, formatter);
        goal.setSavingStartDate(savingStartDateTime);

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
        GoalAccount account = goalAccountRepository.findByGoalId(goalId).orElseThrow(
                () -> new NoSuchElementException("존재하는 규칙이 없습니다."));

        RuleDetailResponse result = new RuleDetailResponse();

        GoalAccountResultSet goalWAccount = goalAccountRepository.showGoalWAccount(goalId);
        RuleDetailResponse.AccountInfo withdrawInfo = new RuleDetailResponse.AccountInfo(
                goalWAccount.getAccount_Num_Masked(),
                goalWAccount.getBank_Name());

        GoalAccountResultSet goalSAccount = goalAccountRepository.showGoalSAccount(goalId);
        RuleDetailResponse.AccountInfo savingsInfo = new RuleDetailResponse.AccountInfo(
                goalSAccount.getAccount_Num_Masked(),
                goalSAccount.getBank_Name());

        result.setWithdrawInfo(withdrawInfo);
        result.setSavingInfo(savingsInfo);

        Optional<RuleDetailResponse.SavingHistory> savingHistories = savingHistoryRepository.findById(goalId)
                .map(sh -> new RuleDetailResponse().new SavingHistory(sh.getSavingAmount(), sh.getSavingDate()));

        result.setSavingHistory(savingHistories);
        return result;
    }
}
