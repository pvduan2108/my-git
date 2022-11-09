package com.nt.rookie.post.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class ReportPOJO {
    private String category;
    private int total;
    private int assigned;
    private int available;
    private int notAvailable;

    private int waitingForRecycling;
    private int recycled;

    public ReportPOJO(String category, int total, int assigned, int available, int notAvailable, int waitingForRecycling, int recycled) {
        this.category = category;
        this.total = total;
        this.assigned = assigned;
        this.available = available;
        this.notAvailable = notAvailable;
        this.waitingForRecycling = waitingForRecycling;
        this.recycled = recycled;
    }
}
