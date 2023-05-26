package com.boolsazo.bankchall.repository;

import com.boolsazo.bankchall.domain.GoalAccount;
import com.boolsazo.bankchall.domain.GoalAccountPK;
import com.boolsazo.bankchall.dto.resultSet.GoalAccountResultSet;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalAccountRepository extends JpaRepository<GoalAccount, GoalAccountPK> {

    @Query(value =
               "SELECT A.account_id, A.user_id, A.bank_name, A.account_num_masked, A.is_used, A.type \n"
                   + "FROM account A LEFT JOIN goal_account G ON A.account_id = G.account_id \n"
                   + "WHERE goal_id = :goalId AND type = 0 ", nativeQuery = true)
    GoalAccountResultSet showGoalWAccount(@Param("goalId") int goalId);

    @Query(value =
               "SELECT A.account_id, A.user_id, A.bank_name, A.account_num_masked, A.is_used, A.type \n"
                   + "FROM account A LEFT JOIN goal_account G ON A.account_id = G.account_id \n"
                   + "WHERE goal_id = :goalId AND type = 1 ", nativeQuery = true)
    GoalAccountResultSet showGoalSAccount(@Param("goalId") int goalId);

    @Modifying
    @Query(value = "DELETE FROM goal_account WHERE goal_id = :goalId ", nativeQuery = true)
    void deleteByGoalId(@Param("goalId") int goalId);

    List<GoalAccount> findByGoalId(int goalId);
}
