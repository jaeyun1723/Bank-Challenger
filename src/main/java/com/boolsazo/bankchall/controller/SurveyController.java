package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.domain.Survey;
import com.boolsazo.bankchall.service.SurveyService;
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
public class SurveyController {

    @Autowired
    private SurveyService service;

    @PostMapping
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
    public Survey showSurvey(@PathVariable("userId") int userId) throws Exception {
        return service.showSurvey(userId);
    }
}
