package com.nt.rookie.post.repository;

import com.nt.rookie.post.PostApplication;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(classes = {PostApplication.class})
class AssetRepositoryTest {
    @Autowired
    AssetRepository repo;

    @Test
    @Order(1)
    void getTotal() {
        assertEquals(0, repo.getTotal("Nothing"));
    }

    @Test
    @Order(2)
    void getCategoryList() {
        assertNotNull(repo.getCategoryList());
    }

    @Test
    @Order(3)
    void getAssetWithState() {
        assertEquals(0, repo.getAssetWithState(5, "Laptop"));
    }
}