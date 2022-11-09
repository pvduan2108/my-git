package com.nt.rookie.post.controller.entityController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nt.rookie.post.dto.ReturnRequestDto;
import com.nt.rookie.post.model.Assignment;
import com.nt.rookie.post.model.SystemUser;
import com.nt.rookie.post.service.ReturnRequestService;
import com.nt.rookie.post.service.impl.ReturnRequestServiceImpl;
import com.nt.rookie.post.util.AssignmentState;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithSecurityContext;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.ServletContext;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class ReturnRequestControllerTest {

    /*Note to use MockBean instead of Mock annotation. MockBean will register mock object into Application context*/
    @MockBean
    ReturnRequestService returnRequestService;

    @InjectMocks
    ReturnRequestController returnRequestController;

    @Autowired
    MockMvc mockMvc;
    @Test
    void shouldCreateMockMvc() {
        assertNotNull(mockMvc);
    }

    @Test
    @WithMockUser(username = "admin", authorities = {"ADMIN"})
    void whenGetAllWithLocationCode_thenReturnDtoList() throws Exception {
        List<ReturnRequestDto> list = new ArrayList<>();
        ReturnRequestDto a = new ReturnRequestDto();
        a.setId(1);
        ReturnRequestDto b = new ReturnRequestDto();
        a.setId(2);
        list.add(a);
        list.add(b);
        when(returnRequestService.findAll("HN",null,null,null)).thenReturn(list);
        MvcResult result = this.mockMvc.perform(get("/admin/return")
                .param("locationCode", "HN"))
                .andExpect(status().isOk()).andReturn();
        String resultContext = result.getResponse().getContentAsString();
        ObjectMapper objectMapper = new ObjectMapper();
        ReturnRequestDto[] response = objectMapper.readValue(resultContext, ReturnRequestDto[].class);
        assertEquals(list.size(),response.length);
    }

    @Test
    @WithMockUser(username = "admin", authorities = {"ADMIN"})
    void whenGetAllWithNoParameter_thenReturnStatus400() throws Exception {
        this.mockMvc.perform(get("/admin/return"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "admin", authorities = {"ADMIN"})
    void whenCompleteReturn_thenReturnUpdatedDtoInResponseBody() throws Exception {
        ReturnRequestDto input = new ReturnRequestDto();
        input.setAcceptedBy("Admin");
        input.setReturnDate("05/08/2022");
        when(returnRequestService.completeReturn(anyInt(),any(ReturnRequestDto.class))).thenAnswer(invocationOnMock -> {
            ReturnRequestDto mock = new ReturnRequestDto();
            mock.setId(invocationOnMock.getArgument(0));
            mock.setState(AssignmentState.COMPLETED);
            ReturnRequestDto in = invocationOnMock.getArgument(1);
            mock.setAcceptedBy(in.getAcceptedBy());
            mock.setReturnDate(in.getReturnDate());
            return mock;
        });
        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody = objectMapper.writeValueAsString(input);
        MvcResult result = this.mockMvc.perform(put("/admin/return/complete/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk()).andReturn();
        String resultContext = result.getResponse().getContentAsString();
        ReturnRequestDto response = objectMapper.readValue(resultContext, ReturnRequestDto.class);
        assertEquals(1,response.getId());
        assertEquals(AssignmentState.COMPLETED,response.getState());
        assertEquals(input.getReturnDate(),response.getReturnDate());
        assertEquals(input.getAcceptedBy(),response.getAcceptedBy());
    }

    @Test
    @WithMockUser(username = "admin", authorities = {"ADMIN"})
    void whenCancelReturn_thenReturnUpdatedDtoInResponseBody() throws Exception {
        ReturnRequestDto mockOutput = new ReturnRequestDto();
        mockOutput.setId(1);
        mockOutput.setState(AssignmentState.ACCEPTED);
        mockOutput.setRequestedBy("");
        when(returnRequestService.cancelReturn(1)).thenReturn(mockOutput);
        ObjectMapper objectMapper = new ObjectMapper();
        MvcResult result = this.mockMvc.perform(put("/admin/return/cancel/1"))
                .andExpect(status().isOk()).andReturn();
        String resultContext = result.getResponse().getContentAsString();
        ReturnRequestDto response = objectMapper.readValue(resultContext, ReturnRequestDto.class);
        assertEquals(1,response.getId());
        assertEquals(AssignmentState.ACCEPTED,response.getState());
        assertNull(response.getReturnDate());
    }
}