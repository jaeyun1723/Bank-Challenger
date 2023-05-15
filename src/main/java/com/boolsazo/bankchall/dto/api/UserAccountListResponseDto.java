package com.boolsazo.bankchall.dto.api;

import java.util.List;
import lombok.Data;

@Data
public class UserAccountListResponseDto {
    private String api_tran_id;
    private String rsp_code;
    private String rsp_message;
    private String api_tran_dtm;
    private String user_seq_no;
    private String user_ci;
    private String user_name;
    private String res_cnt;
    private List<BankAccountDto> res_list;
}
