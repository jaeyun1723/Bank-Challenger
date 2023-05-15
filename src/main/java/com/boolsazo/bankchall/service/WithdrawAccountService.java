package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.dto.AccountResponse;
import com.boolsazo.bankchall.dto.WithdrawRegisterRequest;

public interface WithdrawAccountService {

    void registerAccount(WithdrawRegisterRequest request);

    AccountResponse withdrawList(Long userId);

    void deleteAccount(Long accountId);
}
