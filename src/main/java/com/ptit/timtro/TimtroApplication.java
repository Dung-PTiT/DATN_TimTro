package com.ptit.timtro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class TimtroApplication {

    public static void main(String[] args) {
        SpringApplication.run(TimtroApplication.class, args);
    }

}
