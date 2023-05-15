package com.boolsazo.bankchall.service.impl;

import com.boolsazo.bankchall.dto.api.AccountTransferRequestDto;
import com.boolsazo.bankchall.dto.api.AccountTransferResponseDto;
import com.boolsazo.bankchall.dto.api.RequestTokenDto;
import com.boolsazo.bankchall.dto.api.ResponseTokenDto;
import com.boolsazo.bankchall.dto.api.UserAccountListRequestDto;
import com.boolsazo.bankchall.dto.api.UserAccountListResponseDto;
import com.boolsazo.bankchall.service.OpenBankClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class OpenBankClientImpl implements OpenBankClient {

    private final OpenBankUtil openBankUtil;
    private final HttpHeaders httpHeaders = new HttpHeaders();
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${openbank.bank_tran_id}")
    private String useCode; // 핀테크번호+U -> 거래고유번호 생성기

    @Value("${openbank.client_id}")
    private String clientId;

    @Value("${openbank.client_secret}")
    private String client_secret;
    private String redirect_uri = "http://localhost:8080/";
    private String base_url = "https://testapi.openbanking.or.kr/v2.0";

    //
    @Override
    public ResponseTokenDto requestToken(int user_id, String code)
        throws Exception {
        //post
        RequestTokenDto requestTokenDto = new RequestTokenDto();

        //http 헤더 오브젝트 생성
        httpHeaders.add("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("code", code);
        parameters.add("client_id", clientId);
        parameters.add("client_secret", client_secret);
        parameters.add("redirect_uri", redirect_uri);
        parameters.add("grant_type", "authorization_code");

        // HttpHeader 와 HttpBody를 하나의 오브젝트에 담기
        HttpEntity<MultiValueMap<String, String>> param =
            new HttpEntity<>(parameters, httpHeaders);

        //Http 요청하기 - post 방식으로
        return restTemplate.exchange("https://testapi.openbanking.or.kr/oauth/2.0/token",
            HttpMethod.POST, param, ResponseTokenDto.class).getBody();
    }

    @Override
    public UserAccountListResponseDto requestUserList(String user_seq_no, String access_token)
        throws Exception {
        String url = base_url + "/user/me";
        httpHeaders.set("Authorization", "Bearer"+access_token);
        HttpEntity<String> accountListRequest = new HttpEntity<>(httpHeaders);
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
            .queryParam("user_seq_no", user_seq_no)
            .build();

        return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, accountListRequest,
            UserAccountListResponseDto.class).getBody();
    }

    @Override
    public AccountTransferResponseDto requestTransfer(
        AccountTransferRequestDto accountTransferRequestDto) throws Exception {
        return null;
    }
}
