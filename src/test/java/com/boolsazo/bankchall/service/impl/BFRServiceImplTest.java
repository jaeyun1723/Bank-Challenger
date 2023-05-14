package com.boolsazo.bankchall.service.impl;

import static org.junit.jupiter.api.Assertions.*;

import com.boolsazo.bankchall.dto.BFR;
import com.boolsazo.bankchall.dto.BFRTestForm;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class BFRServiceImplTest {

    @InjectMocks
    private BFRServiceImpl service;

    @Test
    @DisplayName("BFR 도출하기")
    void createBFR() throws Exception {
        //given
        BFRTestForm bfrTestForm = new BFRTestForm(1, 1, 1, 1);

        //when
        BFR bfr = service.createBFR(bfrTestForm);
        System.out.println(bfr);

        //then
        assertEquals(bfr, BFR.LRP);
    }

    @Test
    @DisplayName("BFR 조회하기")
    void showBFR() throws Exception {
        //given
        final int userId = 1;

        //when
        BFR bfr = service.showBFR(userId);

        //then
        assertEquals(bfr, BFR.LRP);
    }

    @Test
    @DisplayName("BFR 등록하기")
    void registerBFR() {
    }

}