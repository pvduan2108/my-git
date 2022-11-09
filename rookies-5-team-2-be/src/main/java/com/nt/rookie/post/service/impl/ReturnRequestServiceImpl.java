package com.nt.rookie.post.service.impl;

import com.nt.rookie.post.dto.ReturnRequestDto;
import com.nt.rookie.post.exceptions.ValidationException;
import com.nt.rookie.post.exceptions.NotFoundException;
import com.nt.rookie.post.mapper.ReturnRequestMapper;
import com.nt.rookie.post.model.Asset;
import com.nt.rookie.post.model.Assignment;
import com.nt.rookie.post.model.Location;
import com.nt.rookie.post.model.SystemUser;
import com.nt.rookie.post.repository.AssetRepository;
import com.nt.rookie.post.repository.ReturnRequestRepository;
import com.nt.rookie.post.service.ReturnRequestService;
import com.nt.rookie.post.service.UserService;
import com.nt.rookie.post.util.AssignmentState;
import com.nt.rookie.post.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.*;
import java.util.*;

import static com.nt.rookie.post.util.BaseConstants.DEFAULT_RETURN_STATES;

@Service
public class ReturnRequestServiceImpl implements ReturnRequestService {

    @Autowired
    ReturnRequestRepository returnRequestRepository;

    @Autowired
    AssetRepository assetRepository;

    @Autowired
    UserService userService;

    /**
     * Find all Assignment in DB query by state, returnDate, asset code, asset name, requestedBy's username.
     * If arguments are null only query by default criterion: state is Waiting for returning or Completed.
     * @param state state to query
     * @param returnDate return date to query
     * @param search keyword to query on asset code, asset name or requestedBy's username
     * @param locationCode location of Assignment to query (this means location of asset, assignedTo or assignedBy)
     * @return {@link ReturnRequestDto}
     */
    @Override
    public List<ReturnRequestDto> findAll(String locationCode, AssignmentState state, Date returnDate, String search) {

        Specification<Assignment> specification = (root, query, criteriaBuilder) -> {
            Join<Assignment, SystemUser> assignedToJoin = root.join("assignedTo");
           Join<SystemUser, Location> locationJoin = assignedToJoin.join("location");
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(criteriaBuilder.equal(locationJoin.get("locationCode"),locationCode));
            if (state != null) {
                predicates.add(criteriaBuilder.equal(root.get("state"),state.getValue()));
            } else {
                List<Predicate> list = new ArrayList<>();
                for (AssignmentState e : DEFAULT_RETURN_STATES) {
                    Predicate equal = criteriaBuilder.equal(root.get("state"), e.getValue());
                    list.add(equal);
                }
                Predicate[] statePredicates = list.toArray(new Predicate[0]);
                predicates.add(criteriaBuilder.or(statePredicates));
            }
            if (returnDate != null) {
                predicates.add(criteriaBuilder.equal(root.get("returnDate"), returnDate));
            }
            if (search != null) {
                Join<Assignment, Asset> assetJoin = root.join("asset");
                Join<Assignment, SystemUser> requestedByJoin = root.join("requestedBy");
                Predicate predicate1 = criteriaBuilder.like(assetJoin.get("assetCode"), "%" + search + "%");
                Predicate predicate2 = criteriaBuilder.like(assetJoin.get("assetName"), "%" + search + "%");
                Predicate predicate3 = criteriaBuilder.like(requestedByJoin.get("username"), "%" + search + "%");
                predicates.add(criteriaBuilder.or(predicate1, predicate2, predicate3));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
        };

        return ReturnRequestMapper.toDtoList(returnRequestRepository.findAll(specification));
    }

    /**
     * Update state of an Assignment from Waiting for returning to Completed as well as its returnDate and acceptedBy
     * @param id assignment id
     * @param dto store data to update
     * @throws NotFoundException if assignment not found by id
     * @throws ValidationException if assignment is not in Waiting for returning state
     * @see #getById(int)
     * @return {@link ReturnRequestDto}
     */
    @Override
    public ReturnRequestDto completeReturn(int id, ReturnRequestDto dto) {
        Assignment foundAssignment = this.getById(id);
        if (foundAssignment.getState() == AssignmentState.WAITING_FOR_RETURNING.getValue()) {
            foundAssignment.setState(AssignmentState.COMPLETED.getValue());
        } else {
            throw new ValidationException("Only Request in Waiting for returning state can be completed");
        }
        if (dto.getAcceptedBy() != null) {
            SystemUser foundAcceptedBy = userService.findWithUsername(dto.getAcceptedBy());
            if (foundAcceptedBy != null) {
                foundAssignment.setAcceptedBy(foundAcceptedBy);
            } else {
                throw new ValidationException("acceptedBy is invalid user");
            }
        }
        if (dto.getReturnDate() != null) {
            foundAssignment.setReturnDate(DateUtil.convertToDate(dto.getReturnDate()));
        }
        if (foundAssignment.getAsset().getState() == 3) {
            foundAssignment.getAsset().setState(0);
        } else {
            throw new ValidationException("Asset should be in state Assigned before assignment completion");
        }
        assetRepository.save(foundAssignment.getAsset());
        returnRequestRepository.save(foundAssignment);

        return ReturnRequestMapper.toDto(foundAssignment);
    }

    /**
     * Update state of an Assignment from Waiting for returning to Accepted as well as its clear requestedBy
     * @param id assignment id
     * @throws NotFoundException if assignment not found by id
     * @throws ValidationException if assignment is not in Waiting for returning state
     * @see #getById(int)
     */
    @Override
    public ReturnRequestDto cancelReturn(int id) {
        Assignment found = this.getById(id);
        if (found.getState() == AssignmentState.WAITING_FOR_RETURNING.getValue()) {
            found.setState(AssignmentState.ACCEPTED.getValue());
        } else {
            throw new ValidationException("Only Request in Waiting for returning state can be cancelled");
        }
        found.setRequestedBy(null);
        returnRequestRepository.save(found);

        return ReturnRequestMapper.toDto(found);
    }

    /**
     * Find an Assignment by id.
     * @param id assignment id
     * @return {@link Assignment}
     * @throws NotFoundException if assignment not exist
     */
    public Assignment getById(int id) {
        return returnRequestRepository.findById(id).orElseThrow(() -> new NotFoundException("Assignment not exist"));
    }

}
