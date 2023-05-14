package com.boolsazo.bankchall.service.impl;

import com.boolsazo.bankchall.domain.User;
import com.boolsazo.bankchall.repository.UserRepository;
import com.boolsazo.bankchall.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void registerUser(String id, String name, String age, String gender, String email,
        String birthyear, String profileImage) throws Exception {

        try {
            userRepository.registerUser(id, name, age, gender, email, birthyear, profileImage);
        } catch (Exception e) {
            System.out.println("Error in registerUser");
            System.out.println(e);
        } finally {
            System.out.println("Register user process");
        }
    }

    @Override
    public void updateFinancialType(int userId, String financialType) throws Exception {
        try {
            userRepository.updateFinancialType(userId, financialType);
        } catch (Exception e) {
            System.out.println("Error in updateFinancialType");
        } finally {
            System.out.println("Update user process");
        }
    }

    @Override
    public String findFinancialTypeByUserId(int userId) throws Exception {
        String financialType = "";
        try {
            userRepository.findFinancialTypeByUserId(userId);
        } catch (Exception e) {
            System.out.println("Error in findFinancialTypeByUserId");
        } finally {
            System.out.println("Find financialType process");
        }
        return financialType;
    }

    @Override
    public void deleteByUserId(int userId) throws Exception {
        try {
            userRepository.deleteByUserId(userId);
        } catch (Exception e) {
            System.out.println("Error in deleteByUserId");
        } finally {
            System.out.println("Delete user process");
        }
    }

    @Override
    public User findOneByUserId(int userId) throws Exception {
        User user = null;
        try {
            user = userRepository.findOneByUserId(userId);
        } catch (Exception e) {
            System.out.println("Error in findOneByUserId");
        } finally {
            System.out.println("Find user process");
        }
        return user;
    }

    @Override
    public int findUserIdByEmail(String email) throws Exception {
        int userId = 0;
        try {
            userId = userRepository.findUserIdByEmail(email);
        } catch (Exception e) {
            System.out.println("Error in findUserIdByEmail");
        } finally {
            System.out.println("Find user by email process");
        }
        return userId;
    }
}
