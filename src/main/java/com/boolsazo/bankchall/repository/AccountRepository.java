package com.boolsazo.bankchall.repository;

import com.boolsazo.bankchall.domain.Account;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    List<Account> findByUserIdAndType(int userId, int type);

    Optional<Account> findByAccountId(int AccountId);

    @Query(value = "SELECT EXISTS(SELECT 1 FROM account WHERE fintech_use_num = :fintechUseNum)", nativeQuery = true)
    int checkFintechUseNumExists(@Param("fintechUseNum") String fintechUseNum);

    void delete(Account account);
}
