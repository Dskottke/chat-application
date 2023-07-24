package com.example.backend;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record MessageToUser(ChatMessage chatMessage, List<AppUser> currentAppUsers) {
}
