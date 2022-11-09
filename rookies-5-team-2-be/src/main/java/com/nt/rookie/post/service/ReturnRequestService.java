package com.nt.rookie.post.service;


import com.nt.rookie.post.dto.ReturnRequestDto;
import com.nt.rookie.post.model.Assignment;
import com.nt.rookie.post.util.AssignmentState;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;
import java.util.Map;


public interface ReturnRequestService {

    List<ReturnRequestDto> findAll(String locationCode, AssignmentState state, Date returnDate, String search);

    ReturnRequestDto completeReturn(int id, ReturnRequestDto dto);

    ReturnRequestDto cancelReturn(int id);

}
