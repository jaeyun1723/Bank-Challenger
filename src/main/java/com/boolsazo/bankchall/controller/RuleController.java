package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.dto.RuleRequestDto;
import com.boolsazo.bankchall.service.RuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rule")
public class RuleController {

    @Autowired
    private RuleService service;

    @PostMapping
    public ResponseEntity registerRule(@RequestBody RuleRequestDto dto) {
        try {
            service.registerRule(dto);
            return ResponseEntity.status(HttpStatus.CREATED)
                       .body("Rule created successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                       .body("Failed to create Rule.");
        }
    }

    @PutMapping
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
}
