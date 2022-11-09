package com.nt.rookie.post.service;

import com.nt.rookie.post.dto.AssignmentDto;
import com.nt.rookie.post.util.AssignmentState;

import java.util.List;

public interface AssignmentService {
    public List<AssignmentDto> getAll(String locationCode, String id);

    public List<AssignmentDto> getUserAssignment(String locationCode, String id, String username);

    public List<AssignmentDto> getAssignmentByAssetCode(String assetCode);

    public int saveEditedAssignmentState(AssignmentDto dto);

    public AssignmentDto createAssignment(AssignmentDto assignmentDto);

    public AssignmentDto deleteAssignment(int id);

    public Integer updateAssignment(AssignmentDto dto, AssignmentState state);


}