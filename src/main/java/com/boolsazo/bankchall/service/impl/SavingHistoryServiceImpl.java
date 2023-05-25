package com.boolsazo.bankchall.service.impl;

import com.boolsazo.bankchall.domain.SavingHistory;
import com.boolsazo.bankchall.dto.resultSet.SavingHistoryResultSet;
import com.boolsazo.bankchall.repository.SavingHistoryRepository;
import com.boolsazo.bankchall.service.SavingHistoryService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SavingHistoryServiceImpl implements SavingHistoryService {

    @Autowired
    private SavingHistoryRepository repository;

    @Override
    public void registerSavingHistory(SavingHistory vo) throws Exception {
        repository.save(vo);
    }

    @Override
    public List<SavingHistoryResultSet> showAllByGoalId(int goalId) throws Exception {
        return repository.showAllByGoalId(goalId);
    }

    @Override
    public List<SavingHistoryResultSet> showAllByUserId(int userId) throws Exception {
        return repository.showAllByUserId(userId);
    }

    @Override
    public int showSavingAmountByUserId(int userId) throws Exception {
        return repository.showSavingAmountByUserId(userId);
    }
}
