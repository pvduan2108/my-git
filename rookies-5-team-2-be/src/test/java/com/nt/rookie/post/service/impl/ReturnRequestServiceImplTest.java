package com.nt.rookie.post.service.impl;

import com.nt.rookie.post.dto.ReturnRequestDto;
import com.nt.rookie.post.exceptions.NotFoundException;
import com.nt.rookie.post.model.Assignment;
import com.nt.rookie.post.model.SystemUser;
import com.nt.rookie.post.repository.ReturnRequestRepository;
import com.nt.rookie.post.util.AssignmentState;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.stubbing.Answer;
import org.springframework.data.jpa.domain.Specification;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReturnRequestServiceImplTest {

    @Mock
    ReturnRequestRepository returnRequestRepository;

    @Mock
    UserServiceImpl userService;

    @InjectMocks
    ReturnRequestServiceImpl returnRequestService;

    @Test
    void findAll() {
        List<Assignment> list = new ArrayList<>();
        list.add(new Assignment());
        when(returnRequestRepository.findAll(any(Specification.class))).thenReturn(list);
        List<ReturnRequestDto> result = returnRequestService.findAll("HN", null, null, null);
        assertEquals(1,result.size());
    }

    @Test
    void whenCompleteReturn_thenReturnUpdatedDto() {
        ReturnRequestDto input = new ReturnRequestDto();
        int id = 1;
        input.setReturnDate("20/08/2022");
        input.setAcceptedBy("Admin");
        Assignment mockOutput = new Assignment();
        mockOutput.setId(id);
        mockOutput.setState(AssignmentState.WAITING_FOR_RETURNING.getValue());
        SystemUser admin = new SystemUser();
        admin.setUsername("Admin");
        when(returnRequestRepository.findById(id)).thenReturn(Optional.of(mockOutput));
        when(userService.findWithUsername("Admin")).thenReturn(admin);
        when(returnRequestRepository.save(mockOutput)).thenReturn(mockOutput);
        ReturnRequestDto result = returnRequestService.completeReturn(id,input);
        assertEquals(id,result.getId());
        assertEquals(AssignmentState.COMPLETED,result.getState());
        assertEquals(input.getReturnDate(),result.getReturnDate());
        assertEquals(input.getAcceptedBy(),result.getAcceptedBy());
    }

    @Test
    void whenCancelReturn_thenReturnUpdatedDto() {
        Assignment mockOutput = new Assignment();
        mockOutput.setId(1);
        mockOutput.setState(AssignmentState.WAITING_FOR_RETURNING.getValue());
        when(returnRequestRepository.findById(1)).thenReturn(Optional.of(mockOutput));
        when(returnRequestRepository.save(mockOutput)).thenReturn(mockOutput);
        ReturnRequestDto result = returnRequestService.cancelReturn(1);
        assertEquals(1,result.getId());
        assertEquals(AssignmentState.ACCEPTED,result.getState());
        assertTrue(result.getRequestedBy().isEmpty());
    }

    @Test
    void getByIdExist_thenReturnObject() {
        when(returnRequestRepository.findById(anyInt())).thenAnswer(invocationOnMock -> {
            Assignment a = new Assignment();
            a.setId(invocationOnMock.getArgument(0));
            return Optional.of(a);
        });
        Assignment result = returnRequestService.getById(1);
        assertEquals(1,result.getId());
    }

    @Test
    void getByIdNotExist_thenThrowException() {
        when(returnRequestRepository.findById(anyInt())).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class,()->returnRequestService.getById(0));
    }
}