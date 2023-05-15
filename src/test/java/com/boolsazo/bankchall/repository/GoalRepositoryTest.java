package com.boolsazo.bankchall.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.boolsazo.bankchall.domain.Goal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;


@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class GoalRepositoryTest {

    @Autowired
    private final GoalRepository goalRepository;

    public GoalRepositoryTest(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }


    @Test
    public void saveTest() {
        // 원하는 create_date 값 설정
        LocalDateTime customCreateDate = LocalDateTime.of(2023, 5, 14, 10, 30);

        //1. saveGoal
        // Goal 객체 생성
        Goal vo = new Goal();
        vo.setGoalName("아이폰15");
        vo.setGoalAmount(2000L);
        vo.setUserId(5L);  // userId 설정
        vo.setCategory("전자제품");  // category 설정
        vo.setProductId(456L);  // productId 설정
        vo.setSavingAmount(500L);  // savingAmount 설정
        vo.setGoalImage(
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-model-unselect-gallery-1-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660689596976");  // goalImage 설정
        vo.setExpired(false);  // isExpired 설정
        vo.setDay("1");  // day 설정

        // savingStartDate 설정
        Timestamp savingStartDate = Timestamp.valueOf(customCreateDate);
        vo.setSavingStartDate(savingStartDate);

        // create_date 값을 설정
        vo.setCreateDate(customCreateDate);

        // Goal 객체 저장
        Goal savedGoal = goalRepository.save(vo);

        // 저장된 Goal 객체 확인
        assertEquals("아이폰15", savedGoal.getGoalName());
        assertEquals(2000, savedGoal.getGoalAmount());
        assertEquals(5, savedGoal.getUserId());
        assertEquals("전자제품", savedGoal.getCategory());
        assertEquals(456, savedGoal.getProductId());
        assertEquals(500, savedGoal.getSavingAmount());
        assertEquals(
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-model-unselect-gallery-1-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660689596976",
            savedGoal.getGoalImage());
        assertEquals(false, savedGoal.isExpired());
        assertEquals("1", savedGoal.getDay());
        assertEquals(savingStartDate, savedGoal.getSavingStartDate());
        assertEquals(customCreateDate, savedGoal.getCreateDate());


    }

    @Test
    public void findByIdTest() {
//2.goalId로 목표 상세 정보 조회
        long goalId = 1L; // 조회할 Goal의 ID
        Optional<Goal> foundGoalOptional = goalRepository.findById(1L);
        Goal foundGoal = foundGoalOptional.orElse(null);
//        int goalId = 1; // 조회할 Goal의 ID
//
//        Optional<Goal> foundGoalOptional = goalRepository.findById(goalId);
//        Goal foundGoal = foundGoalOptional.orElse(null);

        // Goal 객체 검색 결과 확인

        if (foundGoal != null) {
            System.out.println("Goal ID: " + foundGoal.getGoalId());
            System.out.println("Goal Name: " + foundGoal.getGoalName());
            System.out.println("Goal Amount: " + foundGoal.getGoalAmount());
            System.out.println("User ID: " + foundGoal.getUserId());
            System.out.println("Category: " + foundGoal.getCategory());
            System.out.println("Product ID: " + foundGoal.getProductId());
            System.out.println("Saving Amount: " + foundGoal.getSavingAmount());
            System.out.println("Goal Image: " + foundGoal.getGoalImage());
            System.out.println("Is Expired: " + foundGoal.isExpired());
            System.out.println("Day: " + foundGoal.getDay());
            System.out.println("Saving Start Date: " + foundGoal.getSavingStartDate());
            System.out.println("Create Date: " + foundGoal.getCreateDate());
            System.out.println("---------------------------------------");
        } else {
            System.out.println("Goal not found.");
        }
    }

    //3. deleteById
    @Test
    public void deleteByIdTest() {
        long goalId = 1L; // 조회할 Goal의 ID

        Optional<Goal> foundGoalOptional = goalRepository.findById(goalId);
        Goal foundGoal = foundGoalOptional.orElse(null);

        //long goalId = savedGoal.getGoalId();
        goalRepository.deleteById(goalId);

        // 삭제된 Goal 객체 확인
        Goal deletedGoal = goalRepository.findById(goalId).orElse(null);
        assertNull(deletedGoal);

    }


    //4. 목표 리스트 조회
    @Test
    public void findAllTest() {
        //4. 목표 리스트 조회
        List<Goal> goalList = goalRepository.findAll();

        // Goal 객체가 적어도 하나 이상 있는지 확인
        assertTrue(goalList.size() > 0);
        for (Goal goal : goalList) {
            System.out.println("Goal ID: " + goal.getGoalId());
            System.out.println("Goal Name: " + goal.getGoalName());
            System.out.println("Goal Amount: " + goal.getGoalAmount());
            System.out.println("User ID: " + goal.getUserId());
            System.out.println("Category: " + goal.getCategory());
            System.out.println("Product ID: " + goal.getProductId());
            System.out.println("Saving Amount: " + goal.getSavingAmount());
            System.out.println("Goal Image: " + goal.getGoalImage());
            System.out.println("Is Expired: " + goal.isExpired());
            System.out.println("Day: " + goal.getDay());
            System.out.println("Saving Start Date: " + goal.getSavingStartDate());
            System.out.println("Create Date: " + goal.getCreateDate());
            System.out.println("---------------------------------------");
        }
    }
}


