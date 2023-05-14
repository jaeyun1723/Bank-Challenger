package com.boolsazo.bankchall.controller;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {

    @GetMapping(value = "/status/login")
    public Map<String, Boolean> isLogin(HttpServletRequest request) {
        Map<String, Boolean> result = new HashMap<>();

        if (request.getSession().getAttribute("sessionId") != null) {
            result.put("login", true);
        } else {
            result.put("login", false);
        }

        return result;
    }

}
