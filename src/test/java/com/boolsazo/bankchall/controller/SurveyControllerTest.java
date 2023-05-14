package com.boolsazo.bankchall.controller;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.boolsazo.bankchall.domain.Survey;
import com.boolsazo.bankchall.service.SurveyService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.NoSuchElementException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = SurveyController.class)
class SurveyControllerTest {

    @Autowired
    MockMvc mvc;

    @MockBean
    SurveyService service;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DisplayName("설문조사 등록")
    void registerSurvey() throws Exception {
        Survey survey = new Survey(1, 350, 50, "학생", 50, 40, false);

        mvc.perform(post("/survey")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(survey)))
            .andExpect(status().isCreated());

    }

    @Test
    @DisplayName("설문조사 조회 성공")
    void showSurvey() throws Exception {
        Survey survey = new Survey(1, 350, 50, "학생", 50, 40, false);
        given(service.showSurvey(1)).willReturn(survey);

        mvc.perform(get("/survey/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.userId").value(survey.getUserId()))
            .andExpect(jsonPath("$.monthlyIncome").value(survey.getMonthlyIncome()))
            .andExpect(jsonPath("$.spendingRatio").value(survey.getSpendingRatio()))
            .andExpect(jsonPath("$.occupation").value(survey.getOccupation()))
            .andExpect(jsonPath("$.savings").value(survey.getSavings()))
            .andExpect(jsonPath("$.loan").value(survey.getLoan()))
            .andExpect(jsonPath("$.married").value(survey.isMarried()));
    }

}