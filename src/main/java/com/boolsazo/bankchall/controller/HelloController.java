package com.boolsazo.bankchall.controller;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@Controller
public class HelloController {

    @GetMapping(value = {"/","/main", "/survey", "/user", "/delete", "/goalMain", "/createMain", "/manageaccount","/mypage", "/session"})
    public String handleError() {
        return "forward:/index.html";
    }

}
