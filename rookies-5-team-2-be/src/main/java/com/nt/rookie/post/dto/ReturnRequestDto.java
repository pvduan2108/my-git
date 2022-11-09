package com.nt.rookie.post.dto;

import com.nt.rookie.post.util.AssignmentState;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Pattern;

@Getter
@Setter
@NoArgsConstructor
public class ReturnRequestDto {
    private int id;
    private String assignedTo;
    private String assetCode;
    private String assetName;
    @Pattern(regexp = "^(0[1-9]|1\\d|2\\d|3[0-1]|[1-9])/(0[1-9]|1[0-2]|[1-9])/(\\d{4})$")
    private String assignedDate;
    private AssignmentState state;
    private String note;
    @Pattern(regexp = "^(0[1-9]|1\\d|2\\d|3[0-1]|[1-9])/(0[1-9]|1[0-2]|[1-9])/(\\d{4})$")
    private String returnDate;
    private String assignedBy;
    private String requestedBy;
    private String acceptedBy;
}
