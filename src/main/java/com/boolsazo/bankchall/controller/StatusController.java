package com.boolsazo.bankchall.controller;

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
public class StatusController {

    UserService userService;

    public StatusController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/login")
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

    @DeleteMapping(value = "/delete")
    public void delete(HttpServletRequest request) {
        int userId = (int) request.getSession().getAttribute("userId");

        try {
            userService.deleteByUserId(userId);
        } catch (Exception e) {
            System.out.println("Error in delete user");
        }
    }

}
