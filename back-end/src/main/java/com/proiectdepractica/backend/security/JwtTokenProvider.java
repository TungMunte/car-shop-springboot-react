package com.proiectdepractica.backend.security;


import com.proiectdepractica.backend.exception.CarAPIException;
import com.proiectdepractica.backend.utils.AppConstants;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + AppConstants.JWT_EXPRIRATION);
        String token = Jwts.builder().setSubject(username).setIssuedAt(new Date()).setExpiration(expireDate).signWith(key()).compact();
        return token;
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(AppConstants.JWT_SECRET));
    }

    //    get username from jwt token
    public String getUsername(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody();
        String username = claims.getSubject();
        return username;
    }

    //    validate jwt token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key())
                    .build()
                    .parse(token);
            return true;
        } catch (MalformedJwtException exception) {
            throw new CarAPIException(HttpStatus.BAD_REQUEST, "invalid jwt token");
        } catch (ExpiredJwtException exception) {
            throw new CarAPIException(HttpStatus.BAD_REQUEST, "expired jwt token");
        } catch (UnsupportedJwtException exception) {
            throw new CarAPIException(HttpStatus.BAD_REQUEST, "unsupported jwt token");
        } catch (IllegalArgumentException exception) {
            throw new CarAPIException(HttpStatus.BAD_REQUEST, "JWT claims string is empty");
        }

    }
}
