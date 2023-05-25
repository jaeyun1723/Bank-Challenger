package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.dto.RuleDetailResponse;
import com.boolsazo.bankchall.dto.RuleRequestDto;
import com.boolsazo.bankchall.dto.api.AccountResponse;
import com.boolsazo.bankchall.service.RuleService;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rule")
@Tag(name = "규칙", description = "규칙 API")
public class RuleController {

    @Autowired
    private RuleService service;

    @PostMapping
    @Operation(summary = "규칙 등록 API", description = "규칙을 등록할 수 있는 API")
    public ResponseEntity registerRule(@RequestBody RuleRequestDto dto) {
        try {
            service.registerRule(dto);
            return ResponseEntity.status(HttpStatus.CREATED)
                       .body("Rule created successfully.");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                       .body("Failed to create Rule.");
        }
    }

    @PutMapping
    @Operation(summary = "규칙 수정 API", description = "규칙을 수정할 수 있는 API")
    public ResponseEntity updateRule(@RequestBody RuleRequestDto dto) {
        try {
            service.registerRule(dto);
            return ResponseEntity.status(HttpStatus.CREATED)
                       .body("Rule updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                       .body("Failed to update Rule.");
        }
    }

    @DeleteMapping("{goalId}")
    @Parameter(name = "goalId", description = "목표 PK")
    @Operation(summary = "규칙 삭제 API", description = "규칙을 삭제할 수 있는 API")
    public ResponseEntity deleteRule(@PathVariable("goalId") int goalId) {
        try {
            service.deleteRule(goalId);
            return ResponseEntity.status(HttpStatus.CREATED)
                       .body("Rule deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                       .body("Failed to delete Rule.");
        }
    }

    @GetMapping("{goalId}")
    @Parameter(name = "goalId", description = "목표 PK")
    @Operation(summary = "규칙 상세 조회 API", description = "해당 목표와 연결된 규칙을 조회할 수 있는 API")
    public ResponseEntity showRule(@PathVariable("goalId") int goalId) {
        try {
            RuleDetailResponse response = service.showRule(goalId);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}
