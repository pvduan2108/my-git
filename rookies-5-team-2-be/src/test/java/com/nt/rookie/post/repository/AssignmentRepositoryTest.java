package com.nt.rookie.post.repository;

import com.nt.rookie.post.PostApplication;
import com.nt.rookie.post.model.Assignment;
import com.nt.rookie.post.repository.AssignmentRepository;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(classes = {PostApplication.class})
public class AssignmentRepositoryTest {
    @Autowired
    AssignmentRepository repo;

    @Test
    @Order(1)
    public void getAssignmentByUsername() {
        assertFalse(repo.getAssignmentByUsername("khanhmq").isEmpty());
    }

    @Test
    @Order(2)
    public void getAssignmentById() {
        assertEquals(1, repo.getAssignmentById(1).getId());
    }

    @Test
    @Order(4)
    public void getAssignmentExceptId() {
        int id = repo.getAllByLocation("HN").get(0).getId();
        List<Assignment> assignments = repo.getAssignmentExceptId("HN", id);
        List<Integer> idList = assignments.stream().map(assignment -> assignment.getId()).collect(Collectors.toList());
        assertFalse(idList.contains(id));
        boolean sorted = true;
        for (int i = 0; i < idList.size() - 1; i++) {
            if (idList.get(i) > idList.get(i + 1)) {
                sorted = false;
            }
        }
        assertTrue(sorted);
        List<Integer> states = assignments.stream().map(assignment -> assignment.getState()).collect(Collectors.toList());
        assertFalse(states.contains(3));
    }

    @Test
    @Order(3)
    public void getAllByLocation() {
        List<Assignment> assignments = repo.getAllByLocation("HN");
        assertFalse(assignments.isEmpty());
        List<Assignment> filter = assignments.stream().filter(assignment -> !assignment.getAssignedTo().getLocation().getLocationCode().equals("HN")).collect(Collectors.toList());
        assertEquals(0, filter.size());
    }

    @Test
    @Order(5)
    public void getAssignmentByUserBeforeToday() {
        List<Assignment> assignments = repo.getAssignmentsByUserBeforeToday("khanhmq").stream().filter(assignment1 -> assignment1.getAssignedDate().after(new Date())).collect(Collectors.toList());
        assertEquals(0,assignments.size());
    }

    @Test
    @Order(6)
    public void getAssignmentByAssetCode(){
        String assetCode = repo.getAllByLocation("HN").get(0).getAsset().getAssetCode();
        List<Assignment> assignments = repo.getAssignmentsByAssetCode(assetCode);
        assertFalse(assignments.isEmpty());
        List<Assignment> odds = assignments.stream().filter(assignment -> !assignment.getAsset().getAssetCode().equalsIgnoreCase(assetCode)).collect(Collectors.toList());
        assertEquals(0,odds.size());
    }
}
