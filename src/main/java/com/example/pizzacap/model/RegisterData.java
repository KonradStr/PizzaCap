package com.example.pizzacap.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class RegisterData {
    private String first_name;
    private String last_name;
    private String email;
    private String phone_number;
    private String password;
}
