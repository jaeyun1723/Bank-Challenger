package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.dto.RegistAccountRequest;
import com.boolsazo.bankchall.dto.api.AccountResponse;
import com.boolsazo.bankchall.service.AccountService;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/savings")
@Tag(name = "저축 계좌", description = "저축 계좌 API")
public class SavingsAccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping
    @Operation(summary = "저축 계좌 등록 API", description = "저축 계좌를 등록할 수 있는 API")
    public ResponseEntity registerAccount(@RequestBody RegistAccountRequest request) {
        try {
            accountService.registSavingAccount(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Savings account created successfully.");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e);
        }
    }

    @GetMapping("/list/{userId}")
    @Parameter(name = "userId", description = "사용자 PK")
    @Operation(summary = "저축 계좌 조회 API", description = "해당 사용자의 등록된 저축 계좌를 조회할 수 있는 API")
    public ResponseEntity<?> savingAcoountList(@PathVariable("userId") int userId) {
        try {
            AccountResponse response = accountService.savingsList(userId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create Savings account.");
        }
    }

    @DeleteMapping("{accountId}")
    @Parameter(name = "accountId", description = "계좌 번호 PK")
    @Operation(summary = "저축 계좌 삭제 API", description = "해당 사용자의 등록된 저축 계좌를 삭제할 수 있는 API")
    public ResponseEntity deleteAccount(@PathVariable("accountId") int accountId) {
        try {
            accountService.deleteAccount(accountId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Savings account deleted successfully.");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

}
