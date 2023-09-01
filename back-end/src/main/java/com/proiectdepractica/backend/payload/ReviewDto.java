package com.proiectdepractica.backend.payload;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private Long id;
    @NotEmpty(message = "content should not be null or empty")
    private String content;
    @Min(value = 0)
    @Max(value = 10)
    private Integer rating;
    private Long id_car;
    private String username;
}
