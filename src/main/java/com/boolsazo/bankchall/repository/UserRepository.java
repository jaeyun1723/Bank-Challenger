package com.boolsazo.bankchall.repository;

import com.boolsazo.bankchall.domain.User;
import com.boolsazo.bankchall.dto.resultSet.CategoryResultSet;
import com.boolsazo.bankchall.dto.resultSet.GenderAgeResultSet;
import com.boolsazo.bankchall.dto.resultSet.GoalAccountResultSet;
import com.boolsazo.bankchall.dto.resultSet.OccupationResultSet;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

@Transactional
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByEmail(String email);

    void deleteByUserId(int userId);

    User findByUserId(int userId);

    @Modifying
    @Query(value = "insert into user (id, name, age, gender, email, birthyear, profile_image) "
            + "values (?1, ?2, ?3, ?4, ?5, ?6, ?7) ;", nativeQuery = true)
    void registerUser(String id, String name, String age, String gender, String email,
            String birthyear, String profileImage);

    @Query(value = "update user set financial_type = ?2 where user_id = ?1 ;", nativeQuery = true)
    void updateFinancialType(int userId, String financialType);

    @Query(value = "select financial_type from user where user_id = ?1 ;", nativeQuery = true)
    String findFinancialTypeByUserId(int userId);

    @Query(value = "select user_id from user where email = ?1 ;", nativeQuery = true)
    int findUserIdByEmail(String email) throws Exception;

    @Query(value = "select category, count(*) count from user u\n"
            + "join goal g on u.user_id = g.user_id\n"
            + "where u.financial_type = (select financial_type from user u where u.user_id = :userId)\n"
            + "group by category", nativeQuery = true)
    List<CategoryResultSet> goalStatistics(@Param("userId") int userId);

    @Query(value = "select gender, count(*) count from user u\n"
            + "join goal g on u.user_id = g.user_id\n"
            + "where u.financial_type = (select financial_type from user u where u.user_id = :userId)\n"
            + "and u.age = :age\n"
            + "group by u.gender", nativeQuery = true)
    GenderAgeResultSet genderAgeStatistics(@PathVariable("userId") int userId, @PathVariable("age") String age);

    @Query(value = "select occupation, count(*) count from user u\n"
            + "join survey s on u.user_id = s.user_id\n"
            + "where u.financial_type = (select financial_type from user u where u.user_id = :userId)\n"
            + "group by occupation", nativeQuery = true)
    List<OccupationResultSet> jobStatistics(@PathVariable("userId") int userId);
}
