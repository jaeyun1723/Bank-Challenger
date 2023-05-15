package com.boolsazo.bankchall.service;


import com.boolsazo.bankchall.dto.api.AccountTransferRequestDto;
import com.boolsazo.bankchall.dto.api.AccountTransferResponseDto;
import com.boolsazo.bankchall.dto.api.ResponseTokenDto;
import com.boolsazo.bankchall.dto.api.UserAccountListRequestDto;
import com.boolsazo.bankchall.dto.api.UserAccountListResponseDto;

public interface OpenBankClient {

    // 토큰 발급 api
    public ResponseTokenDto requestToken(int user_id, String code) throws Exception;

    // 사용자 정보 조회 api
    public UserAccountListResponseDto requestUserList(String user_seq_no, String access_token) throws Exception;

    // 출금 이체 api & 입금 이체 api
    public AccountTransferResponseDto requestTransfer(AccountTransferRequestDto accountTransferRequestDto) throws Exception;
}
