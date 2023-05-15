package com.boolsazo.bankchall.dto.resultSet;

import java.time.LocalDateTime;

/*
    JPARepository에서 @Query( .. , nativeQuery=true)의 리턴객체로 사용한다.
 */
public interface SavingHistoryResultSet {

    LocalDateTime getSaving_Date();

    Integer getSaving_Amount();
}
