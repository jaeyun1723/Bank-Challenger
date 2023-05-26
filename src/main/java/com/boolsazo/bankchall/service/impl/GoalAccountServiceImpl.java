package com.boolsazo.bankchall.service.impl;

import com.boolsazo.bankchall.domain.GoalAccount;
import com.boolsazo.bankchall.dto.resultSet.GoalAccountResultSet;
import com.boolsazo.bankchall.repository.GoalAccountRepository;
import com.boolsazo.bankchall.service.GoalAccountService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoalAccountServiceImpl implements GoalAccountService {

    @Autowired
    private GoalAccountRepository repository;

    @Override
    public void registerGoalAccount(GoalAccount vo) throws Exception {
        repository.save(vo);
    }

    @Override
    public GoalAccountResultSet showGoalWAccount(int goalId) throws Exception {
        return repository.showGoalWAccount(goalId);
    }

    @Override
    public GoalAccountResultSet showGoalSAccount(int goalId) throws Exception {
        return repository.showGoalSAccount(goalId);
    }

    @Override
    public void deleteByGoalId(int goalId) throws Exception {
        repository.deleteByGoalId(goalId);
    }

    @Override
    public List<GoalAccount> findByGoalId(int goalId) throws Exception {
        return repository.findByGoalId(goalId);
    }
}
