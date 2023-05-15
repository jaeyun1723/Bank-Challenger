package com.boolsazo.bankchall.dto;


import com.boolsazo.bankchall.domain.Account;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AccountResponse {

    @Getter
    @Setter
    public static class Result {

        private int accountId;
        private String accountNumMasked; // 마스킹 된 계좌번호
        private String bankName; // 은행
        private boolean isUsed; // 이체 중인지 여부
        private int type; // 0: 출금 1: 저축

        public Result(Account account, boolean isUsed) {
            this.accountId = account.getAccountId();
            this.accountNumMasked = account.getAccountNumMasked();
            this.bankName = account.getBankName();
            this.isUsed = isUsed;
            this.type = account.getType();
        }
    }

    private List<Result> result;

    private int count;

    public AccountResponse(List<Result> result, int count) {
        this.result = result;
        this.count = count;
    }
}
