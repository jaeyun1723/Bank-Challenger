package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.dto.RegistAccountRequest;
import com.boolsazo.bankchall.dto.api.AccountResponse;
import com.boolsazo.bankchall.service.AccountService;
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
public class SavingsAccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping
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
    public ResponseEntity<?> withdrawList(@PathVariable("userId") int userId) {
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
