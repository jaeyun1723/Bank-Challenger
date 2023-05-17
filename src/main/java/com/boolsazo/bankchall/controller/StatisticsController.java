package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.dto.StatisticsCategoryResponse;
import com.boolsazo.bankchall.dto.StatisticsGenderAgeResponse;
import com.boolsazo.bankchall.dto.StatisticsJobResponse;
import com.boolsazo.bankchall.service.StatisticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/statistics")
@Tag(name = "통계", description = "통계 API")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("/goal/{userId}")
    @Parameter(name = "userId", description = "사용자 PK")
    @Operation(summary = "금융대사량별 목표 통계 API", description = "해당 사용자의 금융대사량별로 목표의 개수를 조회할 수 있는 API")
    public ResponseEntity<StatisticsCategoryResponse> goalStatistics(@PathVariable("userId") int userId) throws Exception {
        StatisticsCategoryResponse response = statisticsService.goalStatistics(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("gender-age/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    @Parameter(name = "userId", description = "사용자 PK")
    @Operation(summary = "금융대사량별 성별,나이 통계 API", description = "해당 사용자의 금융대사량별로 성별,나이 통계를 낼 수 있는 API")
    public ResponseEntity<StatisticsGenderAgeResponse> genderAgeStatistics(@PathVariable("userId") int userId) throws Exception {
        StatisticsGenderAgeResponse response = statisticsService.genderAgeStatistics(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("job/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    @Parameter(name = "userId", description = "사용자 PK")
    @Operation(summary = "금융대사량별 직종 통계 API", description = "해당 사용자의 금융대사량을 조회할 수 있는 API")
    public ResponseEntity<StatisticsJobResponse> jobStatistics(@PathVariable("userId") int userId) throws Exception {
        StatisticsJobResponse response =  statisticsService.StatisticsJobResponse(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
