package com.nt.rookie.post.service.impl;

import com.nt.rookie.post.dto.AssignmentDto;
import com.nt.rookie.post.mapper.AssignmentMapper;
import com.nt.rookie.post.model.Asset;
import com.nt.rookie.post.model.Assignment;
import com.nt.rookie.post.model.SystemUser;
import com.nt.rookie.post.repository.AssetRepository;
import com.nt.rookie.post.repository.AssignmentRepository;
import com.nt.rookie.post.repository.UserRepository;
import com.nt.rookie.post.service.AssignmentService;
import com.nt.rookie.post.util.AssignmentState;
import com.nt.rookie.post.util.CheckIdAssignment;
import com.nt.rookie.post.util.DateUtil;
import com.nt.rookie.post.util.GenerateRandomNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.AssertTrue;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.nt.rookie.post.util.AssignmentState.*;

@Service
public class AssignmentServiceImpl implements AssignmentService {
    @Autowired
    private final AssignmentRepository assignmentRepo;
    @Autowired
    private final UserRepository userRepo;
    @Autowired
    private final AssetRepository assetRepo;

    public AssignmentServiceImpl(AssignmentRepository assignmentRepo, UserRepository userRepo,
                                 AssetRepository assetRepo) {
        this.assignmentRepo = Objects.requireNonNull(assignmentRepo);
        this.userRepo = Objects.requireNonNull(userRepo);
        this.assetRepo = Objects.requireNonNull(assetRepo);
    }

    @Override
    public List<AssignmentDto> getAll(String locationCode, String id) {
        List<Assignment> assignments = assignmentRepo.getAllByLocation(locationCode);
        if (id.equalsIgnoreCase("null")) {
            if (assignments.size() != 0) {
                return AssignmentMapper.toDtoList(assignments);
            }
        } else {
            Assignment theLastEdited = assignmentRepo.getAssignmentById(Integer.parseInt(id));
            List<Assignment> theOthers = assignmentRepo.getAssignmentExceptId(locationCode, Integer.parseInt(id));
            theOthers.add(0, theLastEdited);
            return AssignmentMapper.toDtoList(theOthers);
        }
        return null;
    }

    @Override
    public List<AssignmentDto> getUserAssignment(String locationCode, String id, String username) {
        List<Assignment> assignments = assignmentRepo.getAssignmentsByUserBeforeToday(username);
        if (id.equalsIgnoreCase("null")) {
            if (assignments.size() != 0) {
                return AssignmentMapper.toDtoList(assignments);
            }
        } else {
            Assignment theLastEdited = assignmentRepo.getAssignmentById(Integer.parseInt(id));
            List<Assignment> theOthers = assignmentRepo.getAssignmentsByUserBeforeTodayExceptId(username,
                    Integer.parseInt(id));
            theOthers.add(0, theLastEdited);
            return AssignmentMapper.toDtoList(theOthers);
        }
        return null;
    }

    @Override
    public List<AssignmentDto> getAssignmentByAssetCode(String assetCode) {
        List<Assignment> assignments = assignmentRepo.getAssignmentsByAssetCode(assetCode);
        if (assignments.size() == 0) {
            return null;
        } else {
            return AssignmentMapper.toDtoList(assignments);
        }
    }


    @Override
    public AssignmentDto createAssignment(AssignmentDto assignmentDto) {
        Assignment result = new Assignment();
        int idAssign = assignmentRepo.findAll().size() + 1;
        List<Assignment> assignments = assignmentRepo.findAll();
        List<Integer> idList = assignments.stream().map(assignment -> assignment.getId()).collect(Collectors.toList());
        Integer[] intArray = new Integer[idList.size()];
        intArray = idList.toArray(intArray);
        boolean checkId = true;
        while (checkId) {
            checkId = CheckIdAssignment.checkIdAssignment(intArray, idAssign);
        }
        result.setId(idAssign);
        SystemUser toUser = userRepo.findById(assignmentDto.getAssignedTo()).orElse(null);
        result.setAssignedTo(toUser);
        Asset asset = assetRepo.findById(assignmentDto.getAssetCode()).orElse(null);
        asset.setState(3);
        result.setAsset(asset);
        result.setAssignedDate(DateUtil.convertToDate(assignmentDto.getAssignedDate()));
        if (assignmentDto.getState() == ACCEPTED) {
            result.setState(1);
        } else {
            result.setState(0);
        }
        result.setNote(assignmentDto.getNote());
        if (assignmentDto.getReturnDate() == "") {
            result.setReturnDate(null);
        } else {
            result.setReturnDate(DateUtil.convertToDate(assignmentDto.getReturnDate()));
        }
        SystemUser byUser = userRepo.findById(assignmentDto.getAssignedBy()).orElse(null);
        result.setAssignedBy(byUser);
        if (assignmentDto.getAcceptedBy() == null) {
            result.setAcceptedBy(null);
        } else {
            SystemUser acceptUser = userRepo.findById(assignmentDto.getAcceptedBy()).orElse(null);
            result.setAcceptedBy(acceptUser);
        }
        Assignment resul = this.assignmentRepo.saveAndFlush(result);
        return AssignmentMapper.toDto(resul);
    }

    @Override
    public Integer updateAssignment(AssignmentDto dto, AssignmentState state) {
        try {
            Assignment result = assignmentRepo.findById(dto.getId()).orElseThrow();
            SystemUser toUser = userRepo.findById(dto.getAssignedTo()).orElseThrow();
            SystemUser byUser = userRepo.findById(dto.getAssignedBy()).orElseThrow();
//            SystemUser reUser = null;
//            if (dto.getRequestedBy() != "") {
//                reUser = userRepo.findById(dto.getRequestedBy()).orElseThrow();
//            }
            Asset assetOld = assetRepo.findById(result.getAsset().getAssetCode()).orElseThrow();
            Asset assetNew = assetRepo.findById(dto.getAssetCode()).orElseThrow();
            assetNew.setState(3);
            if (assetOld != assetNew) {
                assetOld.setState(0);
            }
            Assignment assignment = AssignmentMapper.updateEntity(dto, result, toUser, byUser, assetNew, state);
//            Assignment assignment = AssignmentMapper.updateEntity(dto, result, reUser, toUser, byUser, assetNew, state);
            assignmentRepo.saveAndFlush(assignment);
            assetRepo.saveAndFlush(assetNew);
            assetRepo.saveAndFlush(assetOld);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public int saveEditedAssignmentState(AssignmentDto dto) {
        try {
            Assignment result = assignmentRepo.findById(dto.getId()).orElseThrow();
            SystemUser reUser = userRepo.findById(dto.getRequestedBy()).orElseThrow();
            if (result.getState() == 1) {
                int state = 2;
                result.setState(state);
            } else
                return 1;
            result.setRequestedBy(reUser);
            assignmentRepo.saveAndFlush(result);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public AssignmentDto deleteAssignment(int id) {
        Assignment result1 = this.assignmentRepo.getAssignmentById(id);
        AssignmentDto result2 = AssignmentMapper.toDto(result1);
        Asset asset = assetRepo.findById(result2.getAssetCode()).orElse(null);
        asset.setState(0);
        result1.setAsset(asset);
        this.assignmentRepo.delete(result1);
        return AssignmentMapper.toDto(result1);
    }
}