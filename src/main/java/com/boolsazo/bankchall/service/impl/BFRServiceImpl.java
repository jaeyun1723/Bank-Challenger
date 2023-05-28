package com.boolsazo.bankchall.service.impl;


import com.boolsazo.bankchall.domain.User;
import com.boolsazo.bankchall.dto.BFR;
import com.boolsazo.bankchall.dto.BFRTestForm;
import com.boolsazo.bankchall.repository.UserRepository;
import com.boolsazo.bankchall.service.BFRService;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BFRServiceImpl implements BFRService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public BFR createBFR(BFRTestForm vo) throws Exception {
        StringBuilder sb = new StringBuilder();

        /* 투자 성향(L-H) */
        if (vo.getInvestTendency() == 1) {
            sb.append("L"); // 1 : 안정추구형(Low-Risk)
        } else if (vo.getInvestTendency() == 2) {
            sb.append("H"); // 2 : 위험 선호형(High-Risk)
        } else {
            throw new IllegalArgumentException("investTendency(투자 비율)은 1 또는 2의 값만 들어올 수 있습니다.");
        }

        /* 소비 성향(R-I) */
        if (vo.getConsumptionTendency() == 1) {
            sb.append("R"); // 1 : 계획형(Reflectivity)
        } else if (vo.getConsumptionTendency() == 2) {
            sb.append("I"); // 2 : 충동형(Impulsivity)
        } else {
            throw new IllegalArgumentException(
                "consumption_tendency(소비 비율)은 1 또는 2의 값만 들어올 수 있습니다.");
        }

        /* 시간지향성(P-F) */
        if (vo.getTimeOrientation() == 1) {
            sb.append("P"); // 1 : 현재 지향형(Present)
        } else if (vo.getTimeOrientation() == 2) {
            sb.append("F"); // 2 : 미래 지향형(Future)
        } else {
            throw new IllegalArgumentException("time_orientation(시간 지향성)은 1 또는 2의 값만 들어올 수 있습니다.");
        }

        String financialType = sb.toString();
        BFR bfr = BFR.valueOf(financialType);

        return bfr;
    }

    @Override
    public void registerBFR(BFRTestForm vo) throws Exception {
        User user = userRepository.findByUserId(vo.getUserId());

        if (user == null) {
            throw new NoSuchElementException("userId에 해당하는 유저가 없습니다.");
        }

        BFR bfr = createBFR(vo);

        user.setFinancialType(bfr.name());
        userRepository.save(user);
    }

    @Override
    public BFR showBFR(int userId) throws Exception {
        try {
            String financialType = userRepository.findFinancialTypeByUserId(userId);
            BFR bfr = BFR.valueOf(financialType);
            return bfr;
        } catch (Exception e) {
            throw new NoSuchElementException("UserId Not Found");
        }


    }
}
