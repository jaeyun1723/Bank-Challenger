package com.boolsazo.bankchall.repository;

import com.boolsazo.bankchall.domain.SavingHistory;
import com.boolsazo.bankchall.dto.resultSet.SavingHistoryResultSet;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SavingHistoryRepository extends JpaRepository<SavingHistory, Integer> {

    @Modifying
    @Query(value = "DELETE FROM saving_history WHERE goal_id = :goalId", nativeQuery = true)
    void deleteByGoalId(@Param("goalId") int goalId);

    @Query(value =
               "SELECT saving_date, saving_amount FROM saving_history \n"
                   + "WHERE goal_id = :goalId", nativeQuery = true)
    List<SavingHistoryResultSet> showAllByGoalId(@Param("goalId") int goalId);

    @Query(value =
               "SELECT saving_date, saving_amount FROM saving_history \n"
                   + "WHERE user_id = :userId", nativeQuery = true)
    List<SavingHistoryResultSet> showAllByUserId(@Param("userId") int userId);

    @Query(value = "SELECT IFNULL(SUM(saving_amount), 0) FROM bankchall.saving_history \n"
                       + "where user_id = :userId", nativeQuery = true)
    int showSavingAmountByUserId(@Param("userId") int userId);

}
