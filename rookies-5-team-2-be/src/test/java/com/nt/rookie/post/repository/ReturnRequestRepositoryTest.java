package com.nt.rookie.post.repository;

import com.nt.rookie.post.model.Assignment;
import com.nt.rookie.post.model.SystemUser;
import com.nt.rookie.post.util.AssignmentState;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
//@TestPropertySource(
//        locations = "classpath:application-test.properties")
//@Sql(scripts = "classpath:schema.sql")
//@TestMethodOrder(MethodOrder.OrderAnnotation.class)
//@Transactional
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ReturnRequestRepositoryTest {

    @Autowired
    ReturnRequestRepository returnRequestRepository;

    @Autowired
    TestEntityManager testEntityManager;

    Assignment testData() {
        Assignment assignment = new Assignment();
        assignment.setId(10);
        assignment.setState(AssignmentState.WAITING_FOR_RETURNING.getValue());
        return assignment;
    }

    @Test
    void findAll() {
    }

    @Test
    @Order(1)
//    @Rollback(false)
    void testSaveNewAssignment() {
        Assignment assignment = testData();
        returnRequestRepository.save(assignment);
        Assignment result = returnRequestRepository.findById(10).get();
        assertEquals(10,result.getId());
    }

    @Test
    @Order(4)
//    @Rollback(false)
    void testSaveUpdateAssignment_ToCompleteReturn() {
        Assignment assignment = testData();
        testEntityManager.persist(assignment);
        SystemUser admin = new SystemUser();
        admin.setUsername("Admin");
        testEntityManager.persist(admin);
        Date today = new Date();
        assignment.setState(AssignmentState.COMPLETED.getValue());
        assignment.setReturnDate(today);
        assignment.setAcceptedBy(admin);
        returnRequestRepository.save(assignment);
        Assignment result = returnRequestRepository.findById(10).get();
        assertAll(() -> {
            assertEquals(10,result.getId());
            assertEquals(AssignmentState.COMPLETED.getValue(),result.getState());
            assertTrue(result.getReturnDate().equals(today));
            assertEquals("Admin",result.getAcceptedBy().getUsername());
        });
    }

    @Test
    @Order(2)

    void whenFindByIdExist_thenReturnOptionalValueNotNull() {
        testEntityManager.persist(testData());
        Assignment result = returnRequestRepository.findById(10).get();
        assertAll(() -> {
            assertEquals(10,result.getId());
            assertEquals(AssignmentState.WAITING_FOR_RETURNING.getValue(),result.getState());
        });
    }

    @Test
    @Order(3)

    void whenFindByIdNotExist_thenReturnOptionalValueNull() {
        Optional<Assignment> result = returnRequestRepository.findById(2);
        assertTrue(result.isEmpty());
    }

    void testSaveUpdateAssignment_ToCancelReturn() {
        Assignment assignment = testData();
        testEntityManager.persist(assignment);
        SystemUser admin = new SystemUser();
        admin.setUsername("Admin");
        testEntityManager.persist(admin);
        Date today = new Date();
        assignment.setState(AssignmentState.COMPLETED.getValue());
        assignment.setReturnDate(today);
        assignment.setAcceptedBy(admin);
        Assignment result = returnRequestRepository.save(assignment);
        assertAll(() -> {
            assertEquals(10,result.getId());
            assertEquals(AssignmentState.COMPLETED.getValue(),result.getState());
            assertTrue(result.getReturnDate().equals(today));
            assertEquals("Admin",result.getAcceptedBy().getUsername());
        });
    }
}