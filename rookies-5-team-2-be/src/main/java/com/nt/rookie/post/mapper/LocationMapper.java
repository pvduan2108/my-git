package com.nt.rookie.post.mapper;

import com.nt.rookie.post.dto.LocationDto;
import com.nt.rookie.post.model.Location;

public class LocationMapper {
    public static LocationDto toDto(Location location) {
        if (location == null) {
            return null;
        }
        LocationDto result = new LocationDto();
        result.setLocationCode(location.getLocationCode());
        result.setLocationName(location.getLocationName());
        return result;
    }

    public static Location toEntity(LocationDto locationDto) {
        if (locationDto == null) {
            return null;
        }
        Location result = new Location();
        result.setLocationCode(locationDto.getLocationCode());
        result.setLocationName(locationDto.getLocationName());
        return result;
    }
}
