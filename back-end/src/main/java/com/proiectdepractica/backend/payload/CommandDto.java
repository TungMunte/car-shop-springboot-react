package com.proiectdepractica.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommandDto {
    private Long id;
    private Date date;
    private boolean isCompleted;
    private Long id_car;
    private String username;

}
