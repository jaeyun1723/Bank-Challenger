package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.domain.UserOauth;
import com.boolsazo.bankchall.dto.RegistAccountRequest;
import com.boolsazo.bankchall.dto.api.BankAccountDto;
import com.boolsazo.bankchall.dto.api.ResponseTokenDto;
import com.boolsazo.bankchall.dto.api.UserAccountListResponseDto;
import com.boolsazo.bankchall.service.impl.AccountServiceImpl;
import com.boolsazo.bankchall.service.impl.OpenBankClientImpl;
import com.boolsazo.bankchall.service.impl.UserOauthServiceImpl;
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
public class OpenBankAPIController {

    @Autowired
    private OpenBankClientImpl openBankClient;

    @Autowired
    private UserOauthServiceImpl userOauthService;

    @Autowired
    private AccountServiceImpl accountService;

    @GetMapping("/{userId}/{code}/{type}")  // type : 프론트에서 입금계좌, 출금계좌 구분자
    public ResponseEntity registerAccessToken(@PathVariable("userId") int userId,
        @PathVariable("code") String code, @PathVariable("type") int type) {
        try {
            UserOauth userOauth = null;
            Optional<UserOauth> UserOauthOptional = userOauthService.findByUserId(userId);
            if (!UserOauthOptional.isPresent()) {
                // 토큰 발급 api
                ResponseTokenDto token = openBankClient.requestToken(userId, code);
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
//            Account account = new Account(userId, accountDto.getAccount_num_masked()
//                , accountDto.getBank_name(), false, type, accountDto.getFintech_use_num());
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
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to register AccessToken.");
        }
    }
}
