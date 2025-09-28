package io.hb3nce04.keykeeperapp.security.service;

import java.util.Optional;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.model.entity.User;
import io.hb3nce04.keykeeperapp.repository.UserRepository;
import io.hb3nce04.keykeeperapp.security.model.UserDetailsImpl;
import io.jsonwebtoken.lang.Collections;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> foundUser = userRepository.findByUsername(username);
        if (foundUser.isEmpty()) {
            throw new UsernameNotFoundException("Felhasználónév nem található");
        }
        return new UserDetailsImpl(
                foundUser.get().getId(),
                foundUser.get().getUsername(),
                foundUser.get().getPassword(),
                Collections.of(
                        new SimpleGrantedAuthority(
                                foundUser.get().getIsAdmin() ? "ROLE_ADMIN" : "ROLE_USER"
                        )
                )
        );
    }
}
