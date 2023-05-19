package com.boolsazo.bankchall.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloController {

    @GetMapping(value = {"/main", "/survey", "/user", "/delete", "/registerAccount", "/goalMain", "/createMain"})
    public String handleError() {
        return "forward:/index.html";
    }

}
