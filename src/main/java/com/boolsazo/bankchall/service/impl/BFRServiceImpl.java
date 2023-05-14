package com.boolsazo.bankchall.service.impl;

import com.boolsazo.bankchall.dto.BFR;
import com.boolsazo.bankchall.dto.BFRTestForm;
import com.boolsazo.bankchall.service.BFRService;

import org.springframework.stereotype.Service;

@Service
public class BFRServiceImpl implements BFRService {


    @Override
    public BFR createBFR(BFRTestForm vo) throws Exception {
        StringBuilder sb = new StringBuilder();

        /* 투자 성향(L-H) */
        if (vo.getInvestTendency() == 1) {
            sb.append("L"); // 1 : 안정추구형(Low-Risk)
        } else if (vo.getInvestTendency() == 2) {
            sb.append("H"); // 2 : 위험 선호형(High-Risk)
        }

        /* 소비 성향(R-I) */
        if (vo.getConsumptionTendency() == 1) {
            sb.append("R"); // 1 : 계획형(Reflectivity)
        } else if (vo.getConsumptionTendency() == 2) {
            sb.append("I"); // 2 : 충동형(Impulsivity)
        }

        /* 시간지향성(P-F) */
        if (vo.getTimeOrientation() == 1) {
            sb.append("P"); // 1 : 현재 지향형(Present)
        } else if (vo.getTimeOrientation() == 2) {
            sb.append("F"); // 2 : 미래 지향형(Future)
        }

        String BFRType = sb.toString();
        BFR bfr = BFR.valueOf(BFRType);

        return bfr;
    }

    @Override
    public void registerBFR(BFRTestForm vo) throws Exception {
        int userId = vo.getUserId();
        BFR bfr = createBFR(vo);

        // TODO: userRepository에 BFR 등록하기

    }

    @Override
    public BFR showBFR(int uerId) throws Exception {
        // TODO: userRepository에서 User의 BFR 가져오기
        //String BFRType = userRepository.getBFR();
        String BFRType = "LRP";
        BFR bfr = BFR.valueOf(BFRType);
        return bfr;
    }
}
