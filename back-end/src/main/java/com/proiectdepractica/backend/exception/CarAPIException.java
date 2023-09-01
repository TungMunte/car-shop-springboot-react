package com.proiectdepractica.backend.exception;

import org.springframework.http.HttpStatus;

public class CarAPIException extends RuntimeException {

    private HttpStatus status;
    private String message;

    public CarAPIException(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
