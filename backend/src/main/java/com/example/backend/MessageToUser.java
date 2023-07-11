package com.example.backend;

import lombok.Builder;

import java.util.List;

@Builder
public record MessageToUser(String chatMessage, List<AppUser> currentAppUsers) {
}
