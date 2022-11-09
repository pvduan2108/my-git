package com.nt.rookie.post.controller.entityController;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.nt.rookie.post.dto.LocationDto;
import com.nt.rookie.post.dto.UserDto;
import com.nt.rookie.post.model.Location;
import com.nt.rookie.post.service.impl.UserServiceImpl;

import com.nt.rookie.post.util.DateUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;

import static org.mockito.BDDMockito.given;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.quality.Strictness.LENIENT;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = LENIENT)
class UserControllerTest {
    @Mock
    private UserServiceImpl userService;

    @InjectMocks
    private UserController userController;
    @Test
    void getById() {
        given(userService.findByUsername(Mockito.anyString())).willReturn(null);
        assertEquals(200, userController.getById("quannk").getStatusCode().value());
    }

    @Test
    void search() {
        ObjectNode node = new ObjectNode(JsonNodeFactory.instance);
        String input = "";
        String locationCode = "";
        String type = "";
        node.put("input", input);
        node.put("locationCode", locationCode);
        node.put("type", type);
        given(userService.searchWithGivenString(Mockito.anyString(), Mockito.anyString(), Mockito.anyString())).willReturn(null);
        assertEquals(200, userController.search(node).getStatusCode().value());
    }

    @Test
    void disableUser() {
        given(userService.disableByUsername(Mockito.anyString())).willReturn(0);
        assertEquals(400, userController.disableUser("").getStatusCode().value());
    }

    @Test
    void updateUser() throws ParseException {
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        ObjectNode node = new ObjectNode(JsonNodeFactory.instance);
        String dateOfBirth = dateFormat.format(new Date());
        String joinedDate = dateFormat.format(new Date());
        String username = "";
        String gender = "";
        String type = "";
        node.put("dateOfBirth", dateOfBirth);
        node.put("joinedDate", joinedDate);
        node.put("username", username);
        node.put("gender", gender);
        node.put("type", type);
        given(userService.updateUser(Mockito.anyString(), Mockito.anyString()
                , Mockito.any(Date.class), Mockito.any(Date.class), Mockito.anyString())).willReturn(null);
        assertEquals(400, userController.updateUser(node).getStatusCode().value());
    }

    @Test
    void findDisableUser() {
        given(userService.disableByUsername(Mockito.anyString())).willReturn(0);
        assertEquals(400, userController.disableUser("").getStatusCode().value());
    }

    @Test
    void createUser() throws ParseException {
        UserDto userDto = new UserDto();
        userDto.setFirstName("Quan");
        userDto.setLastName("Nguyen");
        userDto.setBirthDate(new Date());
        userDto.setJoinedDate(new Date());
        userDto.setLocation(new LocationDto());
        given(userService.getDuplicateUsername(Mockito.anyString())).willReturn(0);
        assertEquals(400, userController.createUser(userDto).getStatusCode().value());
    }
}