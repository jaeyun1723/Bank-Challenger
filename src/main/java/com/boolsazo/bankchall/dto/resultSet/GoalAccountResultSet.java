package com.boolsazo.bankchall.dto.resultSet;

/*
    JPARepository에서 @Query( .. , nativeQuery=true)의 리턴객체로 사용한다.
 */
public interface GoalAccountResultSet {

    Integer getAccount_Id();

    Integer getUser_Id();

    String getBank_Name();

    String getAccount_Num_Masked();

    Boolean getIs_Used();

    Integer getType();

}
