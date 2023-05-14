package com.boolsazo.bankchall.repository;

import com.boolsazo.bankchall.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Account, Long> {

}
