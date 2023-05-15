package com.boolsazo.bankchall.service.impl;


import static org.hamcrest.Matchers.any;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.boolsazo.bankchall.domain.Goal;
import com.boolsazo.bankchall.repository.GoalRepository;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@ExtendWith(MockitoExtension.class)
class GoalServiceImplTest {

    @Mock
    private GoalRepository goalRepository;

    @InjectMocks
    private GoalServiceImpl service;

    private Goal dummyGoal;


    @BeforeEach
    public void setUp() {
        LocalDateTime customCreateDate = LocalDateTime.of(2023, 5, 14, 10, 30);
        Timestamp savingStartDate = Timestamp.valueOf(customCreateDate);
        dummyGoal = new Goal(1L, "전자제품", "아이폰15", 456L, 2000L, 500L,
            "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-model-unselect-gallery-1-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660689596976",
            false, "1", savingStartDate, customCreateDate);
    }

    @Test
    @DisplayName("Goal 등록하기")
    void registerGoal() {
        //given

        LocalDateTime customCreateDate = LocalDateTime.of(2023, 5, 14, 10, 30);
        Timestamp savingStartDate = Timestamp.valueOf(customCreateDate);
        Long userId = 5L;
        String category = "전자제품";
        String goalName = "아이폰15";
        Long productId = 456L;
        Long goalAmount = 2000L;
        Long savingAmount = 200L;
        String goalImage = "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-model-unselect-gallery-1-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660689596976";
        boolean isExpired = false;
        String day = "1";

        Goal goalForm = new Goal(userId, category, goalName, productId, goalAmount,
            savingAmount,
            goalImage, isExpired, day, savingStartDate, customCreateDate);
        Goal expectedGoal = new Goal(userId, category, goalName, productId, goalAmount,
            savingAmount, goalImage, isExpired, day, savingStartDate, customCreateDate);
        when(goalRepository.save(goalForm)).thenReturn(expectedGoal);

        // when
        Goal goal = service.registerGoal(goalForm);

        // then
        assertEquals(expectedGoal, goal);

        System.out.println("Goal ID: " + goal.getGoalId());
        System.out.println("User ID: " + goal.getUserId());
        System.out.println("Category: " + goal.getCategory());
        System.out.println("Goal Name: " + goal.getGoalName());
        System.out.println("Product ID: " + goal.getProductId());
        System.out.println("Goal Amount: " + goal.getGoalAmount());
        System.out.println("Saving Amount: " + goal.getSavingAmount());
        System.out.println("Goal Image: " + goal.getGoalImage());
        System.out.println("Is Expired: " + goal.isExpired());
        System.out.println("Day: " + goal.getDay());
        System.out.println("Saving Start Date: " + goal.getSavingStartDate());
        System.out.println("Create Date: " + goal.getCreateDate());
        System.out.println("---------------------------------------");

    }

    @Test
    @DisplayName("Goal 조회하기")
    void showGoal() {
        // given
        LocalDateTime customCreateDate = LocalDateTime.of(2023, 5, 14, 10, 30);
        Timestamp savingStartDate = Timestamp.valueOf(customCreateDate);

        Goal expectedGoal = dummyGoal;

        // when
        when(goalRepository.findById(1L)).thenReturn(Optional.of(expectedGoal));
        Goal foundGoal = service.showGoal(1L);

        // then
        assertEquals(expectedGoal.getGoalName(), foundGoal.getGoalName());
        assertEquals(expectedGoal.getGoalAmount(), foundGoal.getGoalAmount());
        assertEquals(expectedGoal.getUserId(), foundGoal.getUserId());
        assertEquals(expectedGoal.getCategory(), foundGoal.getCategory());
        assertEquals(expectedGoal.getProductId(), foundGoal.getProductId());
        assertEquals(expectedGoal.getSavingAmount(), foundGoal.getSavingAmount());
        assertEquals(expectedGoal.getGoalImage(), foundGoal.getGoalImage());
        assertEquals(expectedGoal.isExpired(), foundGoal.isExpired());
        assertEquals(expectedGoal.getDay(), foundGoal.getDay());
        assertEquals(expectedGoal.getSavingStartDate(), foundGoal.getSavingStartDate());
        assertEquals(expectedGoal.getCreateDate(), foundGoal.getCreateDate());

        System.out.println("Found Goal Information:");
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
    }

    @Test
    public void deleteGoal() {

        long goalId = 1L; // 삭제할 Goal의 ID

        // when
        doNothing().when(goalRepository).deleteById(goalId);
        service.deleteGoal(goalId);

        // then
        Optional<Goal> deletedGoal = goalRepository.findById(goalId);
        assertFalse(deletedGoal.isPresent());

//        long goalId = 1L; // 삭제할 Goal의 ID
//
//        // when
//        doNothing().when(goalRepository).deleteById(goalId);
//        service.deleteGoal(goalId);
//
//        // then
//        Optional<Goal> deletedGoal = goalRepository.findById(goalId);
//        assertFalse(deletedGoal.isPresent());

    }

    @Test
    public void updateGoal() {

        long goalId = 1L;
        Goal existingGoal = new Goal();  // Initialize this with real data
        Goal updatedGoal = new Goal();  // Initialize this with updated data

        Map<Long, Goal> goals = new HashMap<>();
        goals.put(goalId, existingGoal);

        when(goalRepository.findById(anyLong())).thenAnswer(
            i -> Optional.ofNullable(goals.get(i.getArgument(0))));

        // When
        service.updateGoal(updatedGoal);

        // Then
        Goal result = goalRepository.findById(goalId).get();
        assertEquals(updatedGoal.getGoalName(), result.getGoalName());
        assertEquals(updatedGoal.getGoalAmount(), result.getGoalAmount());

        System.out.println("Updated Goal Information:");
        System.out.println("Goal ID: " + result.getGoalId());
        System.out.println("Goal Name: " + result.getGoalName());
        System.out.println("Goal Amount: " + result.getGoalAmount());
        System.out.println("User ID: " + result.getUserId());
        System.out.println("Category: " + result.getCategory());
        System.out.println("Product ID: " + result.getProductId());
        System.out.println("Saving Amount: " + result.getSavingAmount());
        System.out.println("Goal Image: " + result.getGoalImage());
        System.out.println("Is Expired: " + result.isExpired());
        System.out.println("Day: " + result.getDay());
        System.out.println("Saving Start Date: " + result.getSavingStartDate());
        System.out.println("Create Date: " + result.getCreateDate());
        System.out.println("---------------------------------------");
    }


    @Test
    public void showAllGoal() {
        //4. 목표 리스트 조회
        List<Goal> dummyGoalList = Arrays.asList(dummyGoal);
        when(goalRepository.findAll()).thenReturn(dummyGoalList);

        // When
        List<Goal> goalList = service.showAllGoal(1L);

        assertTrue(goalList.size() > 0);

        for (Goal g : goalList) {
            System.out.println("Goal ID: " + g.getGoalId());
            System.out.println("Goal Name: " + g.getGoalName());
            System.out.println("Goal Amount: " + g.getGoalAmount());
            System.out.println("User ID: " + g.getUserId());
            System.out.println("Category: " + g.getCategory());
            System.out.println("Product ID: " + g.getProductId());
            System.out.println("Saving Amount: " + g.getSavingAmount());
            System.out.println("Goal Image: " + g.getGoalImage());
            System.out.println("Is Expired: " + g.isExpired());
            System.out.println("Day: " + g.getDay());
            System.out.println("Saving Start Date: " + g.getSavingStartDate());
            System.out.println("Create Date: " + g.getCreateDate());
            System.out.println("---------------------------------------");
        }
    }
}