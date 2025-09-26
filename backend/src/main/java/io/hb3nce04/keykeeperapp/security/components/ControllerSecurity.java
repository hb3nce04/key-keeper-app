package io.hb3nce04.keykeeperapp.security.components;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class ControllerSecurity {
    public boolean can(Authentication authentication, boolean requireAdmin) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        return !requireAdmin || authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    }
}
