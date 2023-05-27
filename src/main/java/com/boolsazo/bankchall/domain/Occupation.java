package com.boolsazo.bankchall.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public enum Occupation {
    IN_OCCUPATION("inoccupation", "무직"),
    STUDENT("student", "학생"),
    EMPLOYEE("employee", "회사원"),
    OWNER_OPERATOR("ownerOperator", "자영업자"),
    SPECIALIZED_JOB("specializedJob", "전문직"),
    FREELANCER("freelancer", "프리랜서"),
    CIVIL_SERVANT("civilServant", "공무원"),
    SERVICE("service", "서비스업"),
    ENGINEERING("engineer", "엔지니어");
    private String kor;
    private String eng;

    private Occupation(String eng, String kor) {
        this.kor = kor;
        this.eng = eng;
    }
}
