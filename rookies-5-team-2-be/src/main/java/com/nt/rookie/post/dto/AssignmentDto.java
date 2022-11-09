package com.nt.rookie.post.dto;

import com.nt.rookie.post.util.AssignmentState;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Size;
import java.util.Date;

@Data
@Getter
@Setter
public class AssignmentDto {
    private int id;
    private String assignedTo;
    private String assignedDate;
    private String assignedBy;
    private String acceptedBy;
    private String returnDate;
    @Size(max = 1200, message = "Note can not be more than 1200 characters")
    private String note;
    private AssignmentState state;

    private String requestedBy;
    private String assetCode;
    private String assetName;
    private String specification;
    private boolean canReturn;
}
