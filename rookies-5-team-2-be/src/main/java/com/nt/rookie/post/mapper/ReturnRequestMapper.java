package com.nt.rookie.post.mapper;

import com.nt.rookie.post.dto.ReturnRequestDto;
import com.nt.rookie.post.model.Assignment;
import com.nt.rookie.post.util.AssignmentState;
import com.nt.rookie.post.util.DateUtil;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.nt.rookie.post.util.BaseConstants.PATTERN_TIMESTAMP_E_SLASH;

public class ReturnRequestMapper {
    public static ReturnRequestDto toDto(Assignment assignment) {
        if (assignment == null) {
            return null;
        }
        ReturnRequestDto result = new ReturnRequestDto();
        result.setId(assignment.getId());
        result.setAssignedTo(Objects.isNull(assignment.getAssignedTo()) ?
                "" : assignment.getAssignedTo().getUsername());
        result.setAssetName(Objects.isNull(assignment.getAsset()) ?
                "" : assignment.getAsset().getAssetName());
        result.setAssetCode(Objects.isNull(assignment.getAsset()) ?
                "" : assignment.getAsset().getAssetCode());
        result.setAssignedDate(DateUtil.format(assignment.getAssignedDate(),PATTERN_TIMESTAMP_E_SLASH));
        result.setState(AssignmentState.valueOf(assignment.getState()));
        result.setNote(assignment.getNote());
        result.setReturnDate(DateUtil.format(assignment.getReturnDate(),PATTERN_TIMESTAMP_E_SLASH));
        result.setAssignedBy(Objects.isNull(assignment.getAssignedBy()) ?
                "" : assignment.getAssignedBy().getUsername());
        result.setRequestedBy(Objects.isNull(assignment.getRequestedBy()) ?
                "" : assignment.getRequestedBy().getUsername());
        result.setAcceptedBy(Objects.isNull(assignment.getAcceptedBy()) ?
                "" : assignment.getAcceptedBy().getUsername());
        return result;
    }

    public static List<ReturnRequestDto> toDtoList(List<Assignment> assignmentList) {
        return assignmentList.stream().map(e -> toDto(e)).collect(Collectors.toList());
    }
}
