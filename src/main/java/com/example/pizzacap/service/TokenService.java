package com.example.pizzacap.service;

import com.example.pizzacap.model.TokenAuth;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;


@Service
@Getter
@Setter
public class TokenService {

    private static Map<String, String> tokens = new HashMap<>();
    private static Map<String, String> usersTokens = new HashMap<>();

    private static final SecureRandom secureRandom = new SecureRandom(); //threadsafe
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder(); //threadsafe

    public String generateNewToken(String userName) {
        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        String token = base64Encoder.encodeToString(randomBytes);
        tokens.put(userName, token);
        return base64Encoder.encodeToString(randomBytes);
    }

    public String generateNewUserToken(int userId){
        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        String token = base64Encoder.encodeToString(randomBytes);
        usersTokens.put(String.valueOf(userId), token);
        return base64Encoder.encodeToString(randomBytes);
    }

    public boolean checkToken(TokenAuth token){
        if (tokens.containsKey(token.getUsername())){
            return tokens.get(token.getUsername()).equals(token.getToken());
        }
        return false;
    }

    public boolean checkUserToken(TokenAuth token){
        if (usersTokens.containsKey(token.getUsername())){
            return usersTokens.get(token.getUsername()).equals(token.getToken());
        }
        return false;
    }

}
