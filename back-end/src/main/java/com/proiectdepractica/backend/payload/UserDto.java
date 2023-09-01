package com.proiectdepractica.backend.payload;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Email;
import lombok.Data;

import java.util.Date;

@Data
public class UserDto {
    private Long id;
    private String username;
    @Email
    private String email;
    @JsonIgnore
    private String password;
}
