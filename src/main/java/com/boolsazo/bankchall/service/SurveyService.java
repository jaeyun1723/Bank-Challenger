package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.domain.Survey;

public interface SurveyService {

    void registerSurvey(Survey vo) throws Exception;

    Survey showSurvey(int userId) throws Exception;
}
