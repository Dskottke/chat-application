package com.example.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/redirectTo")
public class RedirectController {

    @GetMapping
    public ResponseEntity<?> redirectToSwagger(@RequestParam String redirectUrl) {
        if (redirectUrl == null || redirectUrl.isBlank())
            return ResponseEntity.badRequest().body("redirectUrl is missing");
        if ("http://localhost:5173".equals(redirectUrl) || redirectUrl.startsWith("http://localhost:5173/"))
            return ResponseEntity.status(301).header("Location", redirectUrl).build();
        return ResponseEntity.badRequest().body("For security reasons, only redirects to http://localhost:5173 are allowed");
    }
}
