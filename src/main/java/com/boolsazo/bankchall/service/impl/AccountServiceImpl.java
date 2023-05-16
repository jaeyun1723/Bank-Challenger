package com.boolsazo.bankchall.service.impl;

import com.boolsazo.bankchall.domain.Account;
import com.boolsazo.bankchall.dto.RegistAccountRequest;
import com.boolsazo.bankchall.dto.api.AccountResponse;
import com.boolsazo.bankchall.repository.AccountRepository;
import com.boolsazo.bankchall.service.AccountService;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public void registWithdrawAccount(RegistAccountRequest request) {
        accountRepository.save(request.toWithdrawEntity());
    }

    @Override
    public void registSavingAccount(RegistAccountRequest request) {
        accountRepository.save(request.toSavingsEntity());
    }

    @Override
    public AccountResponse withdrawList(int userId) {
        List<AccountResponse.Result> list = accountRepository.findByUserIdAndType(userId, (byte) 0).stream()
                .map(account -> new AccountResponse.Result(account, account.isUsed())).collect(
                        Collectors.toList());

        return new AccountResponse(list, list.size());
    }

    @Override
    public AccountResponse savingsList(int userId) {
        List<AccountResponse.Result> list = accountRepository.findByUserIdAndType(userId, (byte) 1).stream()
                .map(account -> new AccountResponse.Result(account, account.isUsed())).collect(
                        Collectors.toList());

        return new AccountResponse(list, list.size());
    }

    @Override
    public void deleteAccount(int accountId) {
        Account account = accountRepository.findByAccountId(accountId).orElseThrow(
                () -> new NoSuchElementException("존재하지 않는 계좌 번호입니다"));

        accountRepository.delete(account);
    }
}
