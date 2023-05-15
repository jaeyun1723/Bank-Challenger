package com.boolsazo.bankchall.dto.api;

import lombok.Data;

@Data
public class ResponseTokenDto {

    private String access_token;
    private String token_type;
    private String refresh_token;
    private String expires_in;
    private String scope;
    private String user_seq_no;
}
