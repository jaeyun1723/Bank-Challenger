package com.boolsazo.bankchall.repository;

import com.boolsazo.bankchall.domain.Account;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    List<Account> findByUserIdAndType(int userId, int type);

    Optional<Account> findByAccountId(int AccountId);

    void delete(Account account);
}
