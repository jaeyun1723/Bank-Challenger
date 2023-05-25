package com.boolsazo.bankchall.service;

import com.boolsazo.bankchall.dto.RuleDetailResponse;
import com.boolsazo.bankchall.dto.RuleRequestDto;

public interface RuleService {

    void registerRule(RuleRequestDto dto) throws Exception;

    void deleteRule(int goalId) throws Exception;

    RuleDetailResponse showRule(int goalId);
}
