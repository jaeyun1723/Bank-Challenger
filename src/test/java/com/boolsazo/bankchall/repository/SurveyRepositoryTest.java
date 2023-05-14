package com.boolsazo.bankchall.repository;

import com.boolsazo.bankchall.domain.Survey;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SurveyRepositoryTest {

    @Autowired
    private SurveyRepository repository;

    @Test
    public void unit() throws Exception {
        Survey survey = new Survey(1, 350, 50, "학생", 50, 40, false);
        repository.save(survey);
    }
}