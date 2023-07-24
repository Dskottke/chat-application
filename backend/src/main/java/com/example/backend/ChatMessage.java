package com.example.backend;

import java.time.LocalDateTime;

public record ChatMessage(String message, AppUser appUser, LocalDateTime time) {
}
