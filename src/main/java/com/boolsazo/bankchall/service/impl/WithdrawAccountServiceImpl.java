package com.boolsazo.bankchall.service.impl;

import com.boolsazo.bankchall.domain.Account;
import com.boolsazo.bankchall.dto.AccountResponse;
import com.boolsazo.bankchall.dto.WithdrawRegisterRequest;
import com.boolsazo.bankchall.repository.AccountRepository;
import com.boolsazo.bankchall.service.WithdrawAccountService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WithdrawAccountServiceImpl implements WithdrawAccountService {

    @Autowired
    AccountRepository accountRepository;

    @Override
    public void registerAccount(WithdrawRegisterRequest request) {
        accountRepository.save(request.toEntity());
    }

    @Override
    public AccountResponse withdrawList(Long userId) {
        List<AccountResponse.Result> list = accountRepository.findByUserIdAndType(userId, (byte) 0).stream()
                .map(account -> new AccountResponse.Result(account, account.isUsed())).collect(
                        Collectors.toList());

        return new AccountResponse(list, list.size());
    }

    @Override
    public void deleteAccount(Long accountId) {
        Account account = accountRepository.findByAccountId(accountId);
        accountRepository.delete(account);
    }
}
