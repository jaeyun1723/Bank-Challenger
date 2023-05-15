package com.boolsazo.bankchall.dto;


import com.boolsazo.bankchall.domain.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WithdrawRegisterRequest {

    private String accountNumMasked;
    private String bankName;
    private boolean isUsed = true;
    private int userId;

    public Account toEntity() {
        return new Account(userId,
                accountNumMasked,
                bankName,
                isUsed,
                0);
    }
}
