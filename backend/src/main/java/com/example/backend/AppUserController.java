package com.example.backend;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/appusers")
public class AppUserController {

    @GetMapping("/me")
    AppUser getMyUser() {
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof DefaultOAuth2User user) {
            var name = String.valueOf(user.getAttributes().get("name"));
            var avatar = String.valueOf(user.getAttributes().get("picture"));
            return new AppUser( name,avatar);
        }
        return null;
    }

}
