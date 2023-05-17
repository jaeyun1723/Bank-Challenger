package com.boolsazo.bankchall.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.boolsazo.bankchall.domain.User;
import com.boolsazo.bankchall.service.UserService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/status")
@Tag(name = "상태 확인", description = "상태 확인 API")
public class StatusController {

    UserService userService;

    public StatusController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/login")
    @Operation(summary = "로그인 여부 확인 API", description = "해당 사용자가 로그인된 사용자인지 확인할 수 있는 API")
    public Map<String, Boolean> isLogin(HttpServletRequest request) {
        Map<String, Boolean> result = new HashMap<>();

        if (request.getSession().getAttribute("sessionId") != null) {
            result.put("login", true);
        } else {
            result.put("login", false);
        }

        return result;
    }

    @GetMapping(value = "/bfr")
    @Operation(summary = "금융대사량 검사 여부 확인 API", description = "해당 사용자가 로그인된 사용자인지 확인할 수 있는 API")
    public Map<String, Boolean> isBFR(HttpServletRequest request) {
        Map<String, Boolean> result = new HashMap<>();
        int userId = (int) request.getSession().getAttribute("userId");

        try {
            String bfr = userService.findFinancialTypeByUserId(userId);
            if (bfr != null) {
                result.put("bfr", true);
            } else {
                result.put("bfr", false);
            }
        } catch (Exception e) {
            System.out.println("Error in check financial type");
        }

        return result;
    }

    @GetMapping("/user")
    @Operation(summary = "사용자 정보 확인 API", description = "해당 사용자가 로그인된 사용자인지 확인할 수 있는 API")
    public User getUserInfo(HttpSession request) throws Exception {
        User user = null;

        try {
            int userId = (int) request.getAttribute("userId");
            user = userService.findByUserId(userId);
        } catch (Exception e) {
            System.out.println("INVALID ACCESS: User Information");
        }

        return user;
    }
}
