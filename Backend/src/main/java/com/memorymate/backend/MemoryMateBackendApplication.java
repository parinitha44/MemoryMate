package com.memorymate.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication(scanBasePackages = "com.memorymate.backend")
public class MemoryMateBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(MemoryMateBackendApplication.class, args);
    }

}
