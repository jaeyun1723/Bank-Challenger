package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.domain.User;

public interface UserService {

    boolean existsByEmail(String email);

    void registerUser(String id, String name, String age, String gender, String email,
        String birthyear, String profileImage) throws Exception;

    void updateFinancialType(int userId, String financialType) throws Exception;

    String findFinancialTypeByUserId(int userId) throws Exception;

    void deleteByUserId(int userId) throws Exception;

    User findOneByUserId(int userId) throws Exception;

    int findUserIdByEmail(String email) throws Exception;
}
