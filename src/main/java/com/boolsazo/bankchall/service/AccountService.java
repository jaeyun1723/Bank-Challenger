package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.domain.Account;
import java.util.List;

public interface AccountService {
    void registerWAccount(Account vo);
    List<Account> showAllWAccount(Long userId);
    void deleteWAccount(Long userId);


}
