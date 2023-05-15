package com.boolsazo.bankchall.service.impl;

import com.boolsazo.bankchall.domain.UserOauth;
import com.boolsazo.bankchall.repository.UserOauthRepository;
import com.boolsazo.bankchall.service.UserOauthService;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserOauthServiceImpl implements UserOauthService {

    @Autowired
    private UserOauthRepository repository;
    @Override
    public UserOauth registerUserOauth(UserOauth vo) throws Exception {
        System.out.println("UserOauthServiceImpl.registerUserOauth");
        System.out.println("vo = " + vo);
        return repository.save(vo);
    }

    @Override
    public Optional<UserOauth> findByUserId(int userId) throws Exception {
        return repository.findByUserId(userId);
    }

    @Override
    public void deleteUserOauth(int userId) throws Exception {
        repository.deleteByUserId(userId);
    }

    public boolean existsByUserId(int userId) throws Exception {
        return repository.existsByUserId(userId);
    }
}
