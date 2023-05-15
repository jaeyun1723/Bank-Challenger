package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.domain.Goal;
import com.boolsazo.bankchall.dto.GoalListResponse;
import com.boolsazo.bankchall.service.GoalService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/goal")
public class GoalController {
    @Autowired
    private GoalService goalService;


    @PostMapping
    public ResponseEntity registerGoal(@RequestBody Goal pvo) {
        try {
            goalService.registerGoal(pvo);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Goal Registered!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to register Goal.");
        }
    }

    @GetMapping("/list/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<GoalListResponse> showAllGoal(@PathVariable("userId") int userId) {
        GoalListResponse goalListResponse = goalService.showAllGoal(userId);
        if (goalListResponse != null && goalListResponse.getGoals() != null && !goalListResponse.getGoals().isEmpty()) {
            return new ResponseEntity<>(goalListResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/detail/{goalId}")
    public Goal showGoal(@PathVariable("goalId") int goalId) throws Exception {
        return goalService.showGoal(goalId);
    }

    @PutMapping("/{goalId}")
    public ResponseEntity<String> updateGoal(@PathVariable("goalId") int goalId, @RequestBody Goal pvo) {
        try {
            goalService.updateGoal(pvo);
            return ResponseEntity.ok("Goal updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update Goal.");
        }
    }

    @DeleteMapping("/{goalId}")
    public ResponseEntity<String> deleteGoal(@PathVariable("goalId") int goalId) {
        try {
            goalService.deleteGoal(goalId);
            return ResponseEntity.ok("Goal deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete Goal.");
        }
    }
}