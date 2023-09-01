package com.proiectdepractica.backend.payload;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class UserUpdateDto {
    private String username;
    @Email
    private String email;
}
