package com.nt.rookie.post.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BcryptPassword {
    public String passwordEncoding(String pw) {
        return new BCryptPasswordEncoder().encode(pw);
    }
}
