package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/appusers")
@RequiredArgsConstructor
public class AppUserController {
    private final WebSocketChatHandler webSocketTextHandler;

    @GetMapping("/me")
    AppUserAuthentication getMyUser() {
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof DefaultOAuth2User user) {
            var name = String.valueOf(user.getAttributes().get("name"));
            var avatar = String.valueOf(user.getAttributes().get("picture"));
            AppUser appUser = new AppUser(name,avatar);
            String pendingToken = webSocketTextHandler.generatePendingToken(appUser);
            return new AppUserAuthentication(appUser,pendingToken);
        }
        return null;
    }

}
