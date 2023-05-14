package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.dto.BFR;
import com.boolsazo.bankchall.dto.BFRTestForm;

public interface BFRService {

    BFR createBFR(BFRTestForm vo) throws Exception;

    void registerBFR(BFRTestForm vo) throws Exception;

    BFR showBFR(int uerId) throws Exception;

}
