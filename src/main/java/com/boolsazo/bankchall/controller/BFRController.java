package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.domain.Survey;
import com.boolsazo.bankchall.dto.BFR;
import com.boolsazo.bankchall.dto.BFRTestForm;
import com.boolsazo.bankchall.service.BFRService;
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
@RequestMapping("/bfr")
@Tag(name = "금융대사량", description = "금융대사량 API")
public class BFRController {

    @Autowired
    private BFRService service;

    @PostMapping
    @Operation(summary = "금융대사량 제출 API", description = "금융대사량 제출 시, 사용하는 API")
    public ResponseEntity registerBFR(@RequestBody BFRTestForm pvo) {
        try {
            service.registerBFR(pvo);
            return ResponseEntity.status(HttpStatus.CREATED)
                       .body("BFR registered successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                       .body("Failed to register BFR. " +e.getMessage());
        }
    }

    @GetMapping("/result/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    @Parameter(name = "userId", description = "사용자 PK")
    @Operation(summary = "해당 사용자 금융대사량 조회 API", description = "해당 사용자의 금융대사량을 조회할 수 있는 API")
    public ResponseEntity showBFR(@PathVariable("userId") int userId) throws Exception {
        try {
            BFR bfr = service.showBFR(userId);
            return ResponseEntity.status(HttpStatus.OK)
                       .body(bfr);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                       .body("Failed to show BFR. " + e.getMessage());
        }
    }
}
