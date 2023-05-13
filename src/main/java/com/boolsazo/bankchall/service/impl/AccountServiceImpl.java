package com.boolsazo.bankchall.service.impl;

import com.boolsazo.bankchall.domain.Account;
import com.boolsazo.bankchall.repository.AccountRepository;
import com.boolsazo.bankchall.service.AccountService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public AccountServiceImpl(AccountService accountService) {
    }

    @Override
    public void registerWAccount(Account vo) {
        accountRepository.save(vo);
    }

    @Override
    public List<Account> showAllWAccount(Long userId) {
        return accountRepository.findAll();
    }

    @Override
    public void deleteWAccount(Long userId) {
        accountRepository.deleteById(userId);
    }
}
