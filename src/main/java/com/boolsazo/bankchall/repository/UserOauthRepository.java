package com.boolsazo.bankchall.repository;

import com.boolsazo.bankchall.domain.User;
import com.boolsazo.bankchall.domain.UserOauth;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserOauthRepository extends JpaRepository<UserOauth, Integer>  {
    boolean existsByUserId(int userId) throws Exception;
    Optional<UserOauth> findByUserId(int userId) throws Exception;
    void deleteByUserId(int userId) throws Exception;
}
