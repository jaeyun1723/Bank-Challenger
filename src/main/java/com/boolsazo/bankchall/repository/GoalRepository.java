package com.boolsazo.bankchall.repository;


import com.boolsazo.bankchall.domain.Goal;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Integer> {

    @Query(value = "select count(*) from goal where user_id = ?1", nativeQuery = true)
    public int countByUserId(int userId);

    List<Goal> findByUserId(int userId);
}
