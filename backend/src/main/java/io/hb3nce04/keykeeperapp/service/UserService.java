package io.hb3nce04.keykeeperapp.service;

import java.util.HashMap;
import java.util.Map;

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
    public UserResponseDto create(UserRequestDto dto) {
        String rawPassword = PasswordUtil.generate();
        User newUser = new User();
        newUser.setUsername(dto.getUsername());
        newUser.setIsAdmin(dto.getIsAdmin());
        newUser.setEmail_address(dto.getEmail_address());
        newUser.setPassword(this.passwordEncoder.encode(rawPassword));
        this.repository.save(newUser);
        sendRegistrationMail(dto.getEmail_address(), dto.getUsername(), rawPassword, dto.getIsAdmin());
        return this.mapper.toDto(newUser);
    }

    @Override
    public UserResponseDto update(Long id, UserRequestDto dto) {
        if (getCurrentUserId().equals(id) && dto.getIsAdmin() == false) {
            throw new BusinessLogicException("A jelenlegi felhasználót nem lehet lefokozni!");
        }
        return super.update(id, dto);
    }

    @Override
    public void delete(Long id) {
        Long currentUserId = super.getCurrentUserId();
        if (currentUserId.equals(id)) {
            throw new BusinessLogicException("A jelenlegi felhasználót nem lehet törölni!");
        }
        super.delete(id);
    }

    private void sendRegistrationMail(
            String email,
            String username,
            String password,
            boolean isAdmin) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("username", username);
        variables.put("password", password);
        variables.put("isAdmin", isAdmin ? "Igen" : "Nem");
        this.mailService.send(email, "Regisztráció", "new-user-email.html", variables);
    }
}
