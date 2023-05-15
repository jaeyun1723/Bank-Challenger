package com.boolsazo.bankchall.repository;

import com.boolsazo.bankchall.domain.Account;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    List<Account> findByUserIdAndType(int userId, int type);

    Account findByAccountId(int AccountId);

    void delete(Account account);
}
