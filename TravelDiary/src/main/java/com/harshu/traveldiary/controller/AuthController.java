package com.harshu.traveldiary.controller;

import com.harshu.traveldiary.dto.LoginDto;
import com.harshu.traveldiary.dto.UserDto;
import com.harshu.traveldiary.entity.User;
import com.harshu.traveldiary.repository.UserRepository;
import com.harshu.traveldiary.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/auth")
public class AuthController {

    //Access AuthService
    private final AuthService authService;

    private final UserRepository userRepository;

    public AuthController (AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    //Register
    @PostMapping("/register")
    public User register(@Valid @RequestBody UserDto userDto) {
        System.out.println("REGISTER API HIT");
        return authService.register(userDto);
    }

    //Login
    @PostMapping("/login")
    public String login(@RequestBody LoginDto loginDto) {
        return authService.login(loginDto);
    }

    @GetMapping("/me")
    public User getCurrentUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName());
    }
}
