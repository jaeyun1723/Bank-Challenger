package com.boolsazo.bankchall.dto.api;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

@Data
public class RequestTokenDto {

    private String code;

    @Value("${openbank.client_id}")
    private String client_id;

    @Value("${openbank.client_secret}")
    private String client_secret;
    private String redirect_uri;
    private String grant_type = "authorization_code";

    public void setRequestToken(String client_id, String client_secret, String redirect_uri,
        String grant_type) {
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.redirect_uri = redirect_uri;
        this.grant_type = grant_type;
    }
}
