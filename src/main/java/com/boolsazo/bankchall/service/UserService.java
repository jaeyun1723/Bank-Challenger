package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.domain.User;

public interface UserService {

    boolean existsByEmail(String email);
    void deleteByUserId(String userId);
    User findByUserId(int userId);

    void registerUser(String id, String name, String age, String gender, String email,
        String birthyear, String profileImage) throws Exception;

    void updateFinancialType(int userId, String financialType) throws Exception;

    String findFinancialTypeByUserId(int userId) throws Exception;

    int findUserIdByEmail(String email) throws Exception;
}
