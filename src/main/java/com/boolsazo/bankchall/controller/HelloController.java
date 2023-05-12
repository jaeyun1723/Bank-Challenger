package com.boolsazo.bankchall.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping(value = {"/login"})
    public String handelError() {
        return "forward:/index.html";
    }

}
