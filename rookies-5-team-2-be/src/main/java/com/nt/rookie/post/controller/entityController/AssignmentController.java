package com.nt.rookie.post.controller.entityController;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.nt.rookie.post.dto.AssignmentDto;
import com.nt.rookie.post.service.impl.AssignmentServiceImpl;
import com.nt.rookie.post.util.AssignmentState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentServiceImpl service;

    @PostMapping("/view")
    public ResponseEntity<List<AssignmentDto>> getAllByLocation(@RequestBody ObjectNode objectNode) {
        String locationCode = objectNode.get("locationCode").asText();
        String id = objectNode.get("assignmentId").asText();
        if (service.getAll(locationCode, id) == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            List<AssignmentDto> dtoList = service.getAll(locationCode, id);
            return new ResponseEntity<>(dtoList, HttpStatus.OK);
        }
    }

    @PostMapping("/user/{username}")
    public ResponseEntity<List<AssignmentDto>> getUserAssignment(@RequestBody ObjectNode objectNode, @PathVariable String username) {
        String locationCode = objectNode.get("locationCode").asText();
        String id = objectNode.get("assignmentId").asText();
        if (service.getUserAssignment(locationCode, id, username) == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            List<AssignmentDto> dtoList = service.getUserAssignment(locationCode, id, username);
            return new ResponseEntity<>(dtoList, HttpStatus.OK);
        }
    }


    @GetMapping("/asset_code={assetCode}")
    public ResponseEntity<List<AssignmentDto>> getAssignmentsByAssetCode(@PathVariable String assetCode) {
        if (service.getAssignmentByAssetCode(assetCode) == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(service.getAssignmentByAssetCode(assetCode), HttpStatus.OK);
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<HttpStatus> saveEditedAssignment(@RequestBody AssignmentDto dto) {
        int result = service.updateAssignment(dto,null);
        if (result == 1) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PutMapping("/edit-state")
    public ResponseEntity<HttpStatus> saveEditedAssignmentState(@RequestBody AssignmentDto dto){
        int result = service.saveEditedAssignmentState(dto);
        if(result==1){
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PutMapping("/state={state}")
    public ResponseEntity<HttpStatus> changeAssignmentState(@RequestBody AssignmentDto dto, @PathVariable AssignmentState state){
        int result = service.updateAssignment(dto, state);
        if(result==1) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.I_AM_A_TEAPOT);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<AssignmentDto> createAssignment(@RequestBody AssignmentDto dto) throws Exception {
        AssignmentDto result = service.createAssignment(dto);
        if(result != null){
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(result, HttpStatus.I_AM_A_TEAPOT);
        }

    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<AssignmentDto> deleteAssignment(@PathVariable String id) throws Exception {
        int id_new = Integer.parseInt(id);
        AssignmentDto result = service.deleteAssignment(id_new);
        if(result != null){
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(result, HttpStatus.I_AM_A_TEAPOT);
        }

    }

}
