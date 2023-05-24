//package com.boolsazo.bankchall.repository;
//
//import com.boolsazo.bankchall.dto.resultSet.GoalAccountResultSet;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
////import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//@RunWith(SpringRunner.class)
//@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//class GoalAccountRepositoryTest {
//
//    @Autowired
//    GoalAccountRepository goalAccountRepository;
//
//    @Test
//    @DisplayName("goalId가 1일 때 출금 계좌")
//    void showGoalWAccount() {
//        GoalAccountResultSet wAccount = goalAccountRepository.showGoalWAccount(1);
//        System.out.println("계좌 ID: " + wAccount.getAccount_Id());
//        System.out.println("계좌 타입: " + wAccount.getType());
//    }
//
//    @Test
//    @DisplayName("goalId가 1일 때 저축 계좌")
//    void showGoalSAccount() {
//        GoalAccountResultSet sAccount = goalAccountRepository.showGoalSAccount(1);
//        System.out.println("계좌 ID: " + sAccount.getAccount_Id());
//        System.out.println("계좌 타입: " + sAccount.getType());
//    }
//
//    @Test
//    @DisplayName("goal_id 일치하는 GoalAccount(계좌-목표 테이블) 행 삭제하기")
//    void deleteByGoalId() {
//        goalAccountRepository.deleteByGoalId(1);
//    }
//}
