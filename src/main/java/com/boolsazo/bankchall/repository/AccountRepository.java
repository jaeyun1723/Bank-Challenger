package com.boolsazo.bankchall.repository;

import com.boolsazo.bankchall.domain.Account;
import com.boolsazo.bankchall.dto.AccountResponse;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    List<Account> findByUserIdAndType(Long userId, long type);

    Account findByAccountId(Long AccountId);

    void delete(Account account);
}
