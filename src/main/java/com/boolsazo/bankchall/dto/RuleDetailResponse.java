package com.boolsazo.bankchall.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class RuleDetailResponse {
    @Getter
    @Setter
    public static class AccountInfo {
        private String accountNo;
        private String bankName;

        public AccountInfo(String accountNo, String bankName) {
            this.accountNo = accountNo;
            this.bankName = bankName;
        }
    }

    @Getter
    @Setter
    public static class SavingHistory {
        private int savingAmount;
        private LocalDateTime savingDate;

        public SavingHistory(int savingAmount, LocalDateTime savingDate) {
            this.savingAmount = savingAmount;
            this.savingDate = savingDate;
        }
    }
    @Schema(description = "규칙에 추가된 해당 목표 pk")
    private int goalId;

    @Schema(description = "출금 계좌 정보")
    private AccountInfo withdrawInfo;

    @Schema(description = "입금 계좌 정보")
    private AccountInfo savingInfo;

    @Schema(description = "계좌 입금 내역")
    private List<SavingHistory> savingHistory;
}
