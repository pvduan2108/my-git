package com.nt.rookie.post.repository;

import com.nt.rookie.post.PostApplication;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = {PostApplication.class})
class UserRepositoryTest {

    @Autowired
    UserRepository userRepo;

    @Test
    void getDuplicateUsername() {
        assertEquals(0, userRepo.getDuplicateUsername("dnsakjdnksa"));
    }
}