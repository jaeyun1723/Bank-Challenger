package com.boolsazo.bankchall.dto.resultSet;

/*
    JPARepository에서 @Query( .. , nativeQuery=true)의 리턴객체로 사용한다.
 */
public interface GenderAgeResultSet {

    String getGender();
    Integer getCount();
}
