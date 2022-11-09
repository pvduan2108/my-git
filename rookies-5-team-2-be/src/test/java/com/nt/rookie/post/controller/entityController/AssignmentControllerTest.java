package com.nt.rookie.post.controller.entityController;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.nt.rookie.post.dto.AssignmentDto;
import com.nt.rookie.post.service.impl.AssignmentServiceImpl;
import com.nt.rookie.post.util.AssignmentState;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class AssignmentControllerTest {
    @Mock
    private AssignmentServiceImpl service;
    @InjectMocks
    private AssignmentController controller;

    @Test
    public void getAllByLocation() throws Exception {
        ObjectNode object = new ObjectNode(JsonNodeFactory.instance);
        String locationCode = "";
        String id = "";
        object.put("locationCode", locationCode);
        object.put("assignmentId",id);
        given(service.getAll(Mockito.anyString(), Mockito.anyString())).willReturn(null);
        assertEquals(404,controller.getAllByLocation(object).getStatusCode().value());
    }
    @Test
    public void getAllByLocation1() throws Exception {
        ObjectNode object = new ObjectNode(JsonNodeFactory.instance);
        String locationCode = "";
        String id = "";
        object.put("locationCode", locationCode);
        object.put("assignmentId",id);
        given(service.getAll(Mockito.anyString(), Mockito.anyString())).willReturn(new ArrayList<>());
        assertEquals(200,controller.getAllByLocation(object).getStatusCode().value());
    }

    @Test
    void getUserAssignment() {
        ObjectNode object = new ObjectNode(JsonNodeFactory.instance);
        String locationCode = "";
        String id = "";
        object.put("locationCode", locationCode);
        object.put("assignmentId",id);
        String username = "";
        given(service.getUserAssignment(Mockito.anyString(), Mockito.anyString(),Mockito.anyString())).willReturn(new ArrayList<>());
        assertEquals(200,controller.getUserAssignment(object,username).getStatusCode().value());
    }
    @Test
    void getUserAssignment1() {
        ObjectNode object = new ObjectNode(JsonNodeFactory.instance);
        String locationCode = "";
        String id = "";
        object.put("locationCode", locationCode);
        object.put("assignmentId",id);
        String username = "";
        given(service.getUserAssignment(Mockito.anyString(), Mockito.anyString(),Mockito.anyString())).willReturn(null);
        assertEquals(404,controller.getUserAssignment(object,username).getStatusCode().value());
    }

    @Test
    void getAssignmentsByAssetCode() {
        String assetCode = "";
        given(service.getAssignmentByAssetCode(assetCode)).willReturn(null);
        assertEquals(404,controller.getAssignmentsByAssetCode(assetCode).getStatusCodeValue());
    }
    @Test
    void getAssignmentsByAssetCode1() {
        String assetCode = "";
        given(service.getAssignmentByAssetCode(assetCode)).willReturn(new ArrayList<>());
        assertEquals(200,controller.getAssignmentsByAssetCode(assetCode).getStatusCodeValue());
    }

    @Test
    void saveEditedAssignment() {
        AssignmentDto dto = new AssignmentDto();
        given(service.updateAssignment(dto,null)).willReturn(1);
        assertEquals(200,controller.saveEditedAssignment(dto).getStatusCodeValue());
    }
    @Test
    void saveEditedAssignment1() {
        AssignmentDto dto = new AssignmentDto();
        given(service.updateAssignment(dto,null)).willReturn(0);
        assertEquals(418,controller.saveEditedAssignment(dto).getStatusCodeValue());
    }

    @Test
    void saveEditedAssignmentState() {
        AssignmentDto dto = new AssignmentDto();
        given(service.saveEditedAssignmentState(dto)).willReturn(1);
        assertEquals(200,controller.saveEditedAssignment(dto).getStatusCodeValue());
    }
    @Test
    void saveEditedAssignmentState1() {
        AssignmentDto dto = new AssignmentDto();
        assertEquals(418,controller.saveEditedAssignment(dto).getStatusCodeValue());
    }

    @Test
    void changeAssignmentState() {
        AssignmentDto dto = new AssignmentDto();
        AssignmentState state = AssignmentState.ACCEPTED;
        given(service.updateAssignment(dto,state)).willReturn(1);
        assertEquals(200,controller.changeAssignmentState(dto,state).getStatusCodeValue());
    }
    @Test
    void changeAssignmentState1() {
        AssignmentDto dto = new AssignmentDto();
        AssignmentState state = AssignmentState.ACCEPTED;
        given(service.updateAssignment(dto,state)).willReturn(0);
        assertEquals(418,controller.changeAssignmentState(dto,state).getStatusCodeValue());
    }

    @Test
    void createAssignment() throws Exception {
        AssignmentDto dto = new AssignmentDto();
        given(service.createAssignment(dto)).willReturn(null);
        assertEquals(418,controller.createAssignment(dto).getStatusCodeValue());
    }
    @Test
    void createAssignment1() throws Exception {
        AssignmentDto dto = new AssignmentDto();
        given(service.createAssignment(dto)).willReturn(new AssignmentDto());
        assertEquals(200,controller.createAssignment(dto).getStatusCodeValue());
    }

    @Test
    void deleteAssignment() throws Exception {
        String id = "1";
        given(service.deleteAssignment(1)).willReturn(null);
        assertEquals(418,controller.deleteAssignment(id).getStatusCodeValue());
    }
    @Test
    void deleteAssignment1() throws Exception {
        String id = "1";
        given(service.deleteAssignment(1)).willReturn(new AssignmentDto());
        assertEquals(200,controller.deleteAssignment(id).getStatusCodeValue());
    }
}