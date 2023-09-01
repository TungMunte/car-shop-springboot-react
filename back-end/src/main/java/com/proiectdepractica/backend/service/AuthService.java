package com.proiectdepractica.backend.service;

import com.proiectdepractica.backend.payload.LoginDto;
import com.proiectdepractica.backend.payload.RegisterDto;

public interface AuthService {
    String login(LoginDto loginDto);

    String register(RegisterDto registerDto);
}
