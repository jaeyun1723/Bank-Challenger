package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.domain.Goal;
import com.boolsazo.bankchall.dto.GoalListResponse;
import com.boolsazo.bankchall.naver.NaverSearch;
import com.boolsazo.bankchall.service.GoalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/goal")
@Tag(name = "목표", description = "목표 API")
public class GoalController {
    @Autowired
    private GoalService goalService;

    @Autowired
    private NaverSearch naverSearch;

    @PostMapping
    @Operation(summary = "목표 등록 API", description = "목표를 등록할 수 있는 API")
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
    @Parameter(name = "userId", description = "사용자 PK")
    @Operation(summary = "해당 사용자 모든 목표 조회 API", description = "해당 사용자의 목표를 조회할 수 있는 API")
    public ResponseEntity<GoalListResponse> showAllGoal(@PathVariable("userId") int userId) {
        GoalListResponse goalListResponse = goalService.showAllGoal(userId);
        if (goalListResponse != null && goalListResponse.getGoals() != null && !goalListResponse.getGoals().isEmpty()) {
            return new ResponseEntity<>(goalListResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/detail/{goalId}")
    @Parameter(name = "goalId", description = "목표 PK")
    @Operation(summary = "해당 목표 상세 조회 API", description = "해당 목표를 상세하게 조회할 수 있는 API")
    public Goal showGoal(@PathVariable("goalId") int goalId) throws Exception {
        return goalService.showGoal(goalId);
    }

    @PutMapping("/{goalId}")
    @Parameter(name = "goalId", description = "목표 PK")
    @Operation(summary = "목표 수정 API", description = "해당 목표를 수정할 수 있는 API")
    public ResponseEntity<String> updateGoal(@PathVariable("goalId") int goalId, @RequestBody Goal pvo) {
        try {
            goalService.updateGoal(pvo);
            return ResponseEntity.ok("Goal updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update Goal.");
        }
    }

    @DeleteMapping("/{goalId}")
    @Parameter(name = "goalId", description = "목표 PK")
    @Operation(summary = "목표 삭제 API", description = "해당 목표를 삭제할수 있는 API")
    public ResponseEntity<String> deleteGoal(@PathVariable("goalId") int goalId) {
        try {
            goalService.deleteGoal(goalId);
            return ResponseEntity.ok("Goal deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete Goal.");
        }
    }

    @GetMapping("/search")
    @Operation(summary = "상품 검색 API", description = "상품을 검색하는 API")
    public ResponseEntity<String> NaverSearch(@RequestParam("query") String query) {
        String searchResult = naverSearch.search(query);
        return ResponseEntity.ok(searchResult);
    }

}
