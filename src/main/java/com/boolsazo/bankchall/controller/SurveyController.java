package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.domain.Survey;
import com.boolsazo.bankchall.service.SurveyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/survey")
@Tag(name = "설문조사", description = "설문조사 API")
public class SurveyController {

    @Autowired
    private SurveyService service;

    @PostMapping
    @Operation(summary = "설문조사 제출 API", description = "설문조사 제출 시, 사용하는 API")
    public ResponseEntity registerSurvey(@RequestBody Survey pvo) {
        try {
            service.registerSurvey(pvo);
            return ResponseEntity.status(HttpStatus.CREATED)
                       .body("Survey created successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                       .body("Failed to create survey.");
        }
    }

    @GetMapping("{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    @Parameter(name = "userId", description = "사용자 PK")
    @Operation(summary = "해당 사용자 설문조사 조회 API", description = "해당 사용자가 제출한 설문조사 조회할 수 있는 API")
    public Survey showSurvey(@PathVariable("userId") int userId) throws Exception {
        return service.showSurvey(userId);
    }
}
