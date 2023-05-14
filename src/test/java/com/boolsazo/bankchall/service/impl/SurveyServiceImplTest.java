package com.boolsazo.bankchall.service.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.boolsazo.bankchall.domain.Survey;
import com.boolsazo.bankchall.repository.SurveyRepository;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class SurveyServiceImplTest {

    @Mock
    private SurveyRepository repository;

    @InjectMocks
    private SurveyServiceImpl service;

    @Test
    void showSurvey() throws Exception {
        //given
        final int userId = 1;
        given(repository.findById(any())).willReturn(
            Optional.of(new Survey(1, 350, 50, "학생", 50, 30, false)));

        //when
        Survey survey = service.showSurvey(userId);

        //then
        assertNotNull(survey);
    }

    @Test
    public void whenExceptionThrown_thenAssertionSucceeds()  {
        Exception exception = assertThrows(NoSuchElementException.class, () -> {
            service.showSurvey(0);
        });

        String expectedMessage = "Survey Not Found";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }
}