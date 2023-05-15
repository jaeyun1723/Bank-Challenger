package com.boolsazo.bankchall.service.impl;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Component
public class OpenBankUtil {

    // 은행거래고유번호 랜덤 생성
    public String getRandomNumber(String bank_tran_id) {

        Random rand = new Random();
        String rst = Integer.toString(rand.nextInt(9) + 1);
        for (int i = 0; i < 8; i++) {
            rst += Integer.toString(rand.nextInt(10));
        }
        return bank_tran_id + rst;
    }

   // 거래 시간
    public String getTransTime() {
        LocalDateTime localDateTime = LocalDateTime.now();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMddhhmmss");
        String now = localDateTime.format(dateTimeFormatter);
        return now;
    }

}
