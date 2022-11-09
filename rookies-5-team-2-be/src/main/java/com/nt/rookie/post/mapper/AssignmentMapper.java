package com.nt.rookie.post.mapper;

import com.nt.rookie.post.dto.AssignmentDto;
import com.nt.rookie.post.model.Asset;
import com.nt.rookie.post.model.Assignment;
import com.nt.rookie.post.model.SystemUser;
import com.nt.rookie.post.util.AssignmentState;
import com.nt.rookie.post.util.DateUtil;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.nt.rookie.post.util.AssignmentState.ACCEPTED;

public class AssignmentMapper {

    public static AssignmentDto toDto(Assignment assignment) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        AssignmentDto result = new AssignmentDto();
        result.setId(assignment.getId());
        result.setAssignedTo(UserMapper.toDto(assignment.getAssignedTo()).getUsername());
        result.setAssetCode(AssetMapper.toDto(assignment.getAsset()).getAssetCode());
        result.setAssetName(AssetMapper.toDto(assignment.getAsset()).getAssetName());
        result.setRequestedBy(Objects.isNull(assignment.getRequestedBy()) ?
                "" : assignment.getRequestedBy().getUsername());
        result.setSpecification(assignment.getAsset().getSpecification());
        result.setAssignedDate(formatter.format(assignment.getAssignedDate()));
        switch (assignment.getState()) {
            case 0:
                result.setState(AssignmentState.valueOf(0));
                break;
            case 1:
                result.setState(AssignmentState.valueOf(1));
                break;
            case 2:
                result.setState(AssignmentState.valueOf(2));
                break;
            case 3:
                result.setState(AssignmentState.valueOf(3));
                break;
            case 4:
                result.setState(AssignmentState.valueOf(4));
                break;
        }
        result.setNote(assignment.getNote());
        if (assignment.getReturnDate() == null) {
            result.setReturnDate(null);
        } else {
            result.setReturnDate(formatter.format(assignment.getReturnDate()));
        }
        result.setAssignedBy(UserMapper.toDto(assignment.getAssignedBy()).getUsername());
        if (assignment.getAcceptedBy() == null) {
            result.setAcceptedBy(null);
        } else {
            result.setAcceptedBy(UserMapper.toDto(assignment.getAcceptedBy()).getUsername());
        }
        result.setCanReturn(Objects.equals(result.getState(), ACCEPTED));
        return result;
    }

    public static List<AssignmentDto> toDtoList(List<Assignment> assignments) {
        return assignments.stream().map(AssignmentMapper::toDto).collect(Collectors.toList());
    }

    public static Assignment updateEntity(AssignmentDto assignment, Assignment result, SystemUser toUser, SystemUser byUser, Asset asset, AssignmentState state) {
        result.setAssignedTo(toUser);
        result.setAssignedBy(byUser);
//        result.setRequestedBy(reUser);
        result.setAsset(asset);
        result.setAssignedDate(DateUtil.convertToDate(assignment.getAssignedDate()));
        result.setNote(assignment.getNote());
        if(state==null) {
            switch (assignment.getState()) {
                case ACCEPTED:
                    result.setState(1);
                    break;
                case WAITING_FOR_RETURNING:
                    result.setState(2);
                    break;
                case COMPLETED:
                    result.setState(3);
                    break;
                case DECLINED:
                    result.setState(4);
                    break;
            }
        } else {
            switch (state) {
                case ACCEPTED:
                    result.setState(1);
                    break;
                case WAITING_FOR_RETURNING:
                    result.setState(2);
                    break;
                case DECLINED:
                    result.setState(4);
                    asset.setState(0);
                    break;
            }
        }
        result.setNote(assignment.getNote());
        return result;
    }

}