package com.nt.rookie.post.service;

import com.nt.rookie.post.dto.UserDto;
import com.nt.rookie.post.model.SystemUser;

import java.util.Date;
import java.util.List;

public interface UserService {
    List<UserDto> findAll();

    SystemUser findWithUsername(String username);

    UserDto findByUsername(String username);

    int disableByUsername(String username);
    int checkDisableByUsername(String username);

    UserDto addUser(UserDto user);

    UserDto updateUser(String username, String gender, Date dateOfBirth, Date joinedDate, String type);

    String changePassword(String username, String newPW);

    List<UserDto> searchWithGivenString(String input, String locationCode, String type);

    //    List<UserDto> filterByType(String type, String locationCode);
    List<UserDto> viewUser(String locationCode, String username);

    int changePasswordOption(String username, String password);
    int getDataNumber();
    int getDuplicateUsername(String username);
}
