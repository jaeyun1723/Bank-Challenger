package com.boolsazo.bankchall.controller;

import com.boolsazo.bankchall.dto.StatisticsCategoryResponse;
import com.boolsazo.bankchall.dto.StatisticsGenderAgeResponse;
import com.boolsazo.bankchall.dto.StatisticsJobResponse;
import com.boolsazo.bankchall.service.StatisticsService;
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
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("/goal/{userId}")
    public ResponseEntity<StatisticsCategoryResponse> goalStatistics(@PathVariable("userId") int userId) throws Exception {
        StatisticsCategoryResponse response = statisticsService.goalStatistics(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("gender-age/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<StatisticsGenderAgeResponse> genderAgeStatistics(@PathVariable("userId") int userId) throws Exception {
        StatisticsGenderAgeResponse response = statisticsService.genderAgeStatistics(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("job/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<StatisticsJobResponse> jobStatistics(@PathVariable("userId") int userId) throws Exception {
        StatisticsJobResponse response =  statisticsService.StatisticsJobResponse(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
