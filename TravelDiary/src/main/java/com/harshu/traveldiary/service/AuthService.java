package com.harshu.traveldiary.service;

import com.harshu.traveldiary.dto.LoginDto;
import com.harshu.traveldiary.dto.UserDto;
import com.harshu.traveldiary.entity.User;
import com.harshu.traveldiary.repository.UserRepository;
import com.harshu.traveldiary.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    //Access Userdata
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    private void jwt() {
    }

    //Login
    public String login (LoginDto loginDto) {

        User user = userRepository.findByEmail(loginDto.getEmail());

        if (user == null) {
            return "User not found";
        }

        if (!passwordEncoder.matches(
                loginDto.getPassword(),
                user.getPassword())) {

            return "Invalid password";
        }

        return jwtUtil.generateToken(user.getEmail());
    }


    //Register
    public User register(UserDto userDto) {
        User user = new User();

        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());

        user.setPassword(
                passwordEncoder.encode(userDto.getPassword())
        );

        return userRepository.save(user);
    }
}
