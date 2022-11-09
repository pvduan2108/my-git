package com.nt.rookie.post.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@Getter
@Setter
public class UserDto {
    private String username;
    private String password;
    @NotEmpty(message = "First name can't be empty")
    @Size(max = 50, message = "First name is too long")
    private String firstName;
    @NotEmpty(message = "Last name can't be empty")
    @Size(max = 50, message = "Last name is too long")
    private String lastName;
    private String fullName;
    @NotEmpty(message = "Birthdate can't be empty")
    private Date birthDate;
    @NotEmpty(message = "Joined Date can't be empty")
    private Date joinedDate;
    @NotEmpty(message = "Gender can't be empty")
    private String gender;
    private String type;
    private String staffCode;
    @NotEmpty(message = "Location can't be empty")
    private LocationDto location;
    private int state;
    private AuthorityDto authority;
    private int firstTime;
}
