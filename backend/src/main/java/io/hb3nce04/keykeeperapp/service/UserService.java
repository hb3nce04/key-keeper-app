package io.hb3nce04.keykeeperapp.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.hb3nce04.keykeeperapp.exception.BusinessLogicException;
import io.hb3nce04.keykeeperapp.mapper.UserMapper;
import io.hb3nce04.keykeeperapp.model.dto.request.UserRequestDto;
import io.hb3nce04.keykeeperapp.model.dto.response.UserResponseDto;
import io.hb3nce04.keykeeperapp.model.entity.User;
import io.hb3nce04.keykeeperapp.repository.UserRepository;
import io.hb3nce04.keykeeperapp.service.common.AbstractCrudService;
import io.hb3nce04.keykeeperapp.service.common.MailService;
import io.hb3nce04.keykeeperapp.util.PasswordUtil;
import jakarta.mail.MessagingException;

@Service
public class UserService extends AbstractCrudService<User, UserRequestDto, UserResponseDto, UserRepository, UserMapper> {
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository repository,
            UserMapper mapper,
            MailService mailService,
            PasswordEncoder passwordEncoder) {
        super(repository, mapper);
        this.mailService = mailService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponseDto create(UserRequestDto dto) throws MessagingException {
        String rawPassword = PasswordUtil.generate();
        User newUser = new User();
        newUser.setUsername(dto.getUsername());
        newUser.setRole(dto.getRole());
        newUser.setEmail_address(dto.getEmail_address());
        newUser.setPassword(this.passwordEncoder.encode(rawPassword));
        this.repository.save(newUser);
        sendRegistrationMail(dto.getEmail_address(), dto.getUsername(), rawPassword);
        return this.mapper.toDto(newUser);
    }

    @Override
    public void delete(Long id) {
        Long currentUserId = this.getCurrentUserId();
        if (currentUserId.equals(id)) {
            throw new BusinessLogicException("A jelenlegi felhasználót nem lehet törölni!");
        }
        super.delete(id);
    }

    private void sendRegistrationMail(
            String email,
            String username,
            String password) throws MessagingException {
        Map<String, Object> variables = new HashMap<>();
        variables.put("username", username);
        variables.put("password", password);
        this.mailService.send(email, "Regisztráció", "new-user-email.html", variables);
    }

    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new BusinessLogicException("Nem sikerült a felhasználó azonosítása!");
        }
        User foundUser = this.repository.findByUsername(authentication.getName());
        return foundUser.getId();
    }
}
