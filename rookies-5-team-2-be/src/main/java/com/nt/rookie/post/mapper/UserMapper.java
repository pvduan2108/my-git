package com.nt.rookie.post.mapper;

import com.nt.rookie.post.dto.UserDto;
import com.nt.rookie.post.model.SystemUser;


import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {
    public static UserDto toDto(SystemUser user) {
        UserDto result = new UserDto();
        result.setUsername(user.getUsername());
        result.setPassword(user.getPassword());
        result.setFirstName(user.getFirstName());
        result.setLastName(user.getLastName());
        result.setBirthDate(user.getBirthDate());
        result.setJoinedDate(user.getJoinedDate());
        result.setGender(user.getGender());
        result.setType(user.getType());
        result.setStaffCode(user.getStaffCode());
        result.setLocation(LocationMapper.toDto(user.getLocation()));
        result.setState(user.getState());
        result.setAuthority(AuthorityMapper.toDto(user.getAuthority()));
        result.setFirstTime(user.getFirstTime());
        result.setFullName(user.getFirstName() + " " + user.getLastName());
        return result;
    }

    public static SystemUser toEntity(UserDto userDto) {
        SystemUser result = new SystemUser();
        result.setUsername(userDto.getUsername());
        result.setPassword(userDto.getPassword());
        result.setFirstName(userDto.getFirstName());
        result.setLastName(userDto.getLastName());
        result.setBirthDate(userDto.getBirthDate());
        result.setJoinedDate(userDto.getJoinedDate());
        result.setGender(userDto.getGender());
        result.setType(userDto.getType());
        result.setStaffCode(userDto.getStaffCode());
        result.setLocation(LocationMapper.toEntity(userDto.getLocation()));
        result.setState(userDto.getState());
        if (userDto.getAuthority() == null) {
            result.setAuthority(null);
        } else {
            result.setAuthority(AuthorityMapper.toEntity(userDto.getAuthority()));
        }
        result.setFirstTime(userDto.getFirstTime());
        return result;
    }

    public static List<UserDto> toDtoList(List<SystemUser> entities) {
        return entities.stream().map(UserMapper::toDto).collect(Collectors.toList());
    }

    public static List<SystemUser> toEntityList(List<UserDto> entities) {
        return entities.stream().map(UserMapper::toEntity).collect(Collectors.toList());
    }
}
