package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.domain.UserOauth;
import com.boolsazo.bankchall.dto.RegistAccountRequest;
import com.boolsazo.bankchall.dto.api.BankAccountDto;
import com.boolsazo.bankchall.dto.api.ResponseTokenDto;
import com.boolsazo.bankchall.dto.api.UserAccountListResponseDto;
import com.boolsazo.bankchall.service.impl.AccountServiceImpl;
import com.boolsazo.bankchall.service.impl.OpenBankClientImpl;
import com.boolsazo.bankchall.service.impl.UserOauthServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/openapi")
@Tag(name = "오픈 뱅킹", description = "오픈 뱅킹 API")
public class OpenBankAPIController {

    @Autowired
    private OpenBankClientImpl openBankClient;

    @Autowired
    private UserOauthServiceImpl userOauthService;

    @Autowired
    private AccountServiceImpl accountService;

    @Parameters({
        @Parameter(name = "userId", description = "사용자 PK"),
        @Parameter(name = "code", description = "오픈뱅킹에서 내려주는 code"),
        @Parameter(name = "type", description = "출금계좌(0), 입금계좌(1) 구분자")
    })
    @GetMapping("/{userId}/{code}/{type}")
    @Operation(summary = "오픈 뱅킹 API와 통신하는 API", description = "오픈 뱅킹 API와 통신할 수 있는 API")
    public ResponseEntity<String> registerAccount(@PathVariable("userId") int userId,
        @PathVariable("code") String code, @PathVariable("type") int type) {
        try {
            UserOauth userOauth = null;
            Optional<UserOauth> UserOauthOptional = userOauthService.findByUserId(userId);
            if (!UserOauthOptional.isPresent()) {
                // 토큰 발급 api
               // System.out.println("1. "+userId+",2 "+code + ", 3 "+type);
                ResponseTokenDto token = openBankClient.requestToken(userId, code);
                System.out.println("1. "+userId+",2 "+code + ", 3 "+type);
              // System.out.println("왜 안돼 "+token.getAccess_token());
                // 2.access_token, seq 저장
                UserOauth vo = new UserOauth(userId, token.getUser_seq_no(),
                    token.getAccess_token());
                userOauth = userOauthService.registerUserOauth(vo);
            } else {
                userOauth = UserOauthOptional.get();
            }

            // 사용자 조회 api
            UserAccountListResponseDto userAccountListResponse = openBankClient.requestUserList(
                userOauth.getUserSeqNo(),
                userOauth.getAccessToken());

            BankAccountDto accountDto = userAccountListResponse.getRes_list().get(0);
            if (!accountService.checkFintechUseNumExists(accountDto.getFintech_use_num())) {
                RegistAccountRequest request = new RegistAccountRequest(
                    accountDto.getAccount_num_masked(),
                    accountDto.getBank_name(),
                    false,
                    userId,
                    accountDto.getFintech_use_num());

                if (type == 0) {
                    accountService.registWithdrawAccount(request);
                } else {
                    accountService.registSavingAccount(request);
                }

                return ResponseEntity.status(HttpStatus.CREATED)
                    .body("account created successfully.");
            }
            else throw new Exception();
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to register account.");
        }
    }
}
