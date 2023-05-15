package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.domain.Account;
import java.util.List;

public interface AccountService {
    void registerWAccount(Account vo);
    List<Account> showAllWAccount(int userId);
    void deleteWAccount(int userId);


}
