package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.dto.api.AccountResponse;
import com.boolsazo.bankchall.dto.WithdrawRegisterRequest;

public interface WithdrawAccountService {

    void registerAccount(WithdrawRegisterRequest request);

    AccountResponse withdrawList(int userId);

    void deleteAccount(int accountId);
}
