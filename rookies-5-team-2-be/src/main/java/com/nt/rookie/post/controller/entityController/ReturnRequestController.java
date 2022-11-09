package com.nt.rookie.post.controller.entityController;

import com.nt.rookie.post.dto.ReturnRequestDto;
import com.nt.rookie.post.service.ReturnRequestService;
import com.nt.rookie.post.util.AssignmentState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.nt.rookie.post.util.BaseConstants.DEFAULT_RETURN_STATES;

@CrossOrigin
@RestController

public class ReturnRequestController {

    @Autowired
    ReturnRequestService returnRequestService;

    /**
     * Get all return request with optional filter and search criteria.
     * Required ADMIN authority.
     * @param state state of return request to filter
     * @param returnDate return date to filter
     * @param search keyword to search by asset code, asset name, request by's username
     * @param locationCode location of admin
     * @return HttpResponse - Response Body: list of {@link ReturnRequestDto}
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/admin/return")
    public List<ReturnRequestDto> getAll(@RequestParam(required = false) AssignmentState state, @DateTimeFormat(pattern = "dd/MM/yyyy") @RequestParam(required = false) Date returnDate,
                                         @RequestParam(required = false) String search, @RequestParam(required = true) String locationCode) {
        return returnRequestService.findAll(locationCode, state, returnDate, search);
    }

    /**
     * Complete a return request.
     * Required ADMIN authority.
     * @param id assignment id
     * @param dto get data of acceptedBy, returnDate for this assignment
     * @return HttpResponse - Response Body: {@link ReturnRequestDto}
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/return/complete/{id}")
    public ReturnRequestDto completeReturn(@PathVariable int id, @Valid @RequestBody ReturnRequestDto dto) {
        return returnRequestService.completeReturn(id,dto);
    }

    /**
     * Cancel a return request.
     * Required ADMIN authority.
     * @param id assignment id
     * @return HttpResponse - no Response Body
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/return/cancel/{id}")
    public ReturnRequestDto cancelReturn(@PathVariable int id) {
        return returnRequestService.cancelReturn(id);
    }

}
