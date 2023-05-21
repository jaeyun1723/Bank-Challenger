package com.boolsazo.bankchall.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "유저정보에 필요한 DTO")
public class UserResponse {

    @Schema(description = "순번")
    private int userId;

    @Schema(description = "네이버 id 토큰")
    private String id;

    @Schema(description = "이름")
    private String name;

    @Schema(description = "이메일")
    private String email;

    @Schema(description = "성별")
    private String gender;

    @Schema(description = "출생년도")
    private String birthYear;

    @Schema(description = "연령대")
    private String age;

    @Schema(description = "프로필 링크")
    private String profileImage;

    @Schema(description = "금융대사량 타입")
    private String financialType;

    @Schema(description = "목표 갯수")
    private int goalCnt;

    @Schema(description = "목표 달성률")
    private int achievementRate;

}
