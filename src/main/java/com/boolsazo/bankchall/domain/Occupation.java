package com.boolsazo.bankchall.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public enum Occupation {
    IN_OCCUPATION("무직"),
    STUDENT("학생"),
    EMPLOYEE("회사원"),
    OWNER_OPERATOR("자영업자"),
    SPECIALIZED_JOB("전문직"),
    FREELANCER("프리랜서"),
    CIVIL_SERVANT("공무원"),
    SERVICE("서비스업"),
    ENGINEERING("엔지니어");
    private String kor;

    private Occupation(String kor) {
        this.kor = kor;
    }
}
