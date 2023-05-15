package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.domain.SavingHistory;
import com.boolsazo.bankchall.dto.resultSet.SavingHistoryResultSet;
import java.util.List;

public interface SavingHistoryService {

    void registerSavingHistory(SavingHistory vo) throws Exception;

    List<SavingHistoryResultSet> showAllByGoalId(int goalId) throws Exception;

    List<SavingHistoryResultSet> showAllByUserId(int userId) throws Exception;
}
