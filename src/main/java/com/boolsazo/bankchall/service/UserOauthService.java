package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.domain.UserOauth;
import java.util.Optional;

public interface UserOauthService {

    UserOauth registerUserOauth(UserOauth vo) throws Exception;

    Optional<UserOauth> findByUserId(int userId) throws Exception;

    void deleteUserOauth(int userId) throws Exception;

    boolean existsByUserId(int userId) throws Exception;
}
