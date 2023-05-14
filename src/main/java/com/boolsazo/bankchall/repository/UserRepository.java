package com.boolsazo.bankchall.repository;

import com.boolsazo.bankchall.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    @Modifying
    @Query(value = "insert into user (id, name, age, gender, email, birthyear, profile_image) "
        + "values (?1, ?2, ?3, ?4, ?5, ?6, ?7) ;", nativeQuery = true)
    void registerUser(String id, String name, String age, String gender, String email,
        String birthyear, String profileImage);

    @Query(value = "update user set financial_type = ?2 where user_id = ?1 ;", nativeQuery = true)
    void updateFinancialType(int userId, String financialType);

    @Query(value = "select financial_type from user where user_id = ?1 ;", nativeQuery = true)
    String findFinancialTypeByUserId(int userId);

    @Query(value = "delete from user where user_id = ?1 ;", nativeQuery = true)
    void deleteByUserId(int userId);

    @Query(value = "select user_id, id, name, age, gender, email, birthyear, profile_image, financial_type from user where user_id = ?1 ;", nativeQuery = true)
    User findOneByUserId(int userId);

    @Query(value = "select user_id from user where email = ?1 ;", nativeQuery = true)
    int findUserIdByEmail(String email) throws Exception;

}
