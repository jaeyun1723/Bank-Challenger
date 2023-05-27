package com.boolsazo.bankchall.dto;

import com.boolsazo.bankchall.domain.Occupation;
import com.boolsazo.bankchall.dto.resultSet.OccupationResultSet;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "금융대사량에 따른 직종 통계 응답 DTO")
public class StatisticsJobResponse {
    @Schema(description = "가장 많은 직종", defaultValue = "")
    private String bestJob;
    @Schema(description = "무직", defaultValue = "0")
    private int inoccupation = 0;

    @Schema(description = "학생", defaultValue = "0")
    private int student = 0;

    @Schema(description = "회사원", defaultValue = "0")
    private int employee = 0;

    @Schema(description = "자영업자", defaultValue = "0")
    private int ownerOperator = 0;

    @Schema(description = "전문직", defaultValue = "0")
    private int specializedJob = 0;

    @Schema(description = "프리랜서", defaultValue = "0")
    private int freelancer = 0;

    @Schema(description = "공무원", defaultValue = "0")
    private int civilServant = 0;

    @Schema(description = "엔지니어", defaultValue = "0")
    private int engineer = 0;

    @Schema(description = "서비스직", defaultValue = "0")
    private int service = 0;

    public StatisticsJobResponse(List<OccupationResultSet> resultSet) {
        int bestCnt = 0;
        for (OccupationResultSet ors : resultSet) {
            String occupation = ors.getOccupation();
            int count = ors.getCount();
            System.out.println(count);
            System.out.println(occupation);
            if (occupation.equals(Occupation.IN_OCCUPATION.getEng())) {
                this.inoccupation = count;
                if (bestCnt < count) this.bestJob = Occupation.IN_OCCUPATION.getKor();
            } else if (occupation.equals(Occupation.STUDENT.getEng())) {
                this.student = count;
                if (bestCnt < count) this.bestJob = Occupation.STUDENT.getKor();
            } else if (occupation.equals(Occupation.EMPLOYEE.getEng())) {
                this.employee = count;
                if (bestCnt < count) this.bestJob = Occupation.EMPLOYEE.getKor();
            } else if (occupation.equals(Occupation.OWNER_OPERATOR.getEng())) {
                this.ownerOperator = count;
                if (bestCnt < count) this.bestJob = Occupation.OWNER_OPERATOR.getKor();
            } else if (occupation.equals(Occupation.SPECIALIZED_JOB.getEng())) {
                this.specializedJob = count;
                if (bestCnt < count) this.bestJob = Occupation.SPECIALIZED_JOB.getKor();
            } else if (occupation.equals(Occupation.FREELANCER.getEng())) {
                this.freelancer = count;
                if (bestCnt < count) this.bestJob = Occupation.FREELANCER.getKor();
            } else if (occupation.equals(Occupation.CIVIL_SERVANT.getEng())) {
                this.civilServant = count;
                if (bestCnt < count) this.bestJob = Occupation.CIVIL_SERVANT.getKor();
            } else if (occupation.equals(Occupation.SERVICE.getEng())) {
                this.service = count;
                if (bestCnt < count) this.bestJob = Occupation.SERVICE.getKor();
            } else if (occupation.equals(Occupation.ENGINEERING.getEng())) {
                this.engineer = count;
                if (bestCnt < count) this.bestJob = Occupation.ENGINEERING.getKor();
            }
        }
    }
}
