package com.boolsazo.bankchall.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RuleDetailResponse {
    @Setter
    public static class AccountInfo {
        private String accountNo;
        private String bankName;

        public AccountInfo(String accountNo, String bankName) {
            this.accountNo = accountNo;
            this.bankName = bankName;
        }
    }

    @Setter
    public class SavingHistory {
        private int amount;
        private LocalDateTime createdDate;

        public SavingHistory(int amount, LocalDateTime createdDate) {
            this.amount = amount;
            this.createdDate = createdDate;
        }
    }

    @Schema(description = "사용자 ID")
    private int userId;

    @Schema(description = "규칙에 추가된 해당 목표 pk")
    private String goalId;

    @Schema(description = "출금 계좌 정보")
    private AccountInfo withdrawInfo;

    @Schema(description = "입금 계좌 정보")
    private AccountInfo savingInfo;

    @Schema(description = "계좌 입금 내역")
    private Optional<SavingHistory> savingHistory;
}
