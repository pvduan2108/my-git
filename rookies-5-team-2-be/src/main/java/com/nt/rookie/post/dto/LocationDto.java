package com.nt.rookie.post.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationDto {
    private String locationCode;
    private String locationName;

    public LocationDto(String locationCode, String locationName) {
        this.locationCode = locationCode;
        this.locationName = locationName;
    }

    public LocationDto() {
    }
}
