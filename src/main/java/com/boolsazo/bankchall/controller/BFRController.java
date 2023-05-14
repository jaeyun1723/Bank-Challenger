package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.dto.BFR;
import com.boolsazo.bankchall.dto.BFRTestForm;
import com.boolsazo.bankchall.service.BFRService;
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
@RequestMapping("/bfr")
public class BFRController {

    @Autowired
    private BFRService service;

    @PostMapping
    public ResponseEntity registerBFR(@RequestBody BFRTestForm pvo) {
        try {
            service.registerBFR(pvo);
            return ResponseEntity.status(HttpStatus.CREATED)
                       .body("BFR registered successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                       .body("Failed to register BFR.");
        }
    }

    @GetMapping("/result/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public BFR showBFR(@PathVariable("userId") int userId) throws Exception {
        return service.showBFR(userId);
    }
}
