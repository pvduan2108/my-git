package com.nt.rookie.post.service.impl;

import com.nt.rookie.post.dto.LocationDto;
import com.nt.rookie.post.dto.ReturnRequestDto;
import com.nt.rookie.post.dto.UserDto;
import com.nt.rookie.post.exceptions.NotFoundException;
import com.nt.rookie.post.mapper.UserMapper;
import com.nt.rookie.post.model.Assignment;
import com.nt.rookie.post.model.Authority;
import com.nt.rookie.post.model.Location;
import com.nt.rookie.post.model.SystemUser;
import com.nt.rookie.post.repository.AssignmentRepository;
import com.nt.rookie.post.repository.AuthorityRepository;
import com.nt.rookie.post.repository.LocationRepository;
import com.nt.rookie.post.repository.UserRepository;
import com.nt.rookie.post.service.UserService;
import com.nt.rookie.post.util.BcryptPassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private AssignmentRepository assignRepo;

    @Autowired
    private AuthorityRepository authRepo;

    @Autowired
    private LocationRepository locationRepo;
//    public UserServiceImpl(UserRepository userRepo) {
//        this.userRepo = userRepo;
//    }

    public UserServiceImpl(UserRepository userRepo, AssignmentRepository assignRepo, AuthorityRepository authRepo, LocationRepository locationRepo) {
        this.userRepo = Objects.requireNonNull(userRepo);
        this.assignRepo = Objects.requireNonNull(assignRepo);
        this.authRepo = Objects.requireNonNull(authRepo);
        this.locationRepo = Objects.requireNonNull(locationRepo);
    }

    /**
     * Get the number of user in database to determine new user's staffCode
     * @see #findAll()
     * @return {@link Integer}
     */
    @Override
    public int getDataNumber() {
        return userRepo.findAll().size();
    }

    /**
     * Get the number of existing user with same username to determine new user's username
     * @param username new username gen by UserGenerator util
     * @see #getDuplicateUsername(String)
     * @return {@link Integer}
     */
    @Override
    public int getDuplicateUsername(String username) {
        return this.userRepo.getDuplicateUsername(username);
    }

    /**
     * Get the list of all active user (User with state 1 in database)
     * @see #findAll()
     * @see #checkActiveUserEntity(SystemUser)
     * @return {@link List<UserDto>}
     */
    @Override
    public List<UserDto> findAll() {
        return UserMapper.toDtoList(this.userRepo.findAll().stream()
                .filter(s -> checkActiveUserEntity(s)).collect(Collectors.toList()));
    }

    /**
     * Find active user with given username, return dto
     * @param username username used to find user
     * @see #findByUsername(String)
     * @see #checkActiveUserEntity(SystemUser)
     * @return {@link UserDto}
     */
    @Override
    public UserDto findByUsername(String username) {
        SystemUser found = this.userRepo.findById(username).orElse(null);
        if (found == null || !checkActiveUserEntity(found)) {
            return null;
        }
        return UserMapper.toDto(found);
    }

    /**
     * Find user with given username, return entity
     * @param username username to find user
     * @see #findByUsername(String)
     * @see #checkActiveUserEntity(SystemUser)
     * @return {@link SystemUser}
     */
    @Override
    public SystemUser findWithUsername(String username) {
        SystemUser found = this.userRepo.findById(username).orElse(null);
        if (found == null || !checkActiveUserEntity(found)) {
            return null;
        }
        return found;
    }

    /**
     * Disable user by checking if it has active assignment or not, if not change user's state to 0
     * @param username username to find user
     * @see #checkActiveUserEntity(SystemUser)
     * @return {@link Integer}
     */
    @Override
    public int disableByUsername(String username) {
        SystemUser found = this.userRepo.findById(username).orElse(null);
        List<Assignment> checkedList = this.assignRepo.getAssignmentByUsername(username);
        if (!checkedList.isEmpty()) {
            return 0;
        }
        if (found == null || !checkActiveUserEntity(found)) {
            return 0;
        }
        found.setState(0);
        userRepo.save(found);
        return 1;
    }

    /**
     * Add a new user to database with user dto class.
     * Use user, authority and location repository to add new user entity going with new authority and location
     * @param user new user in dto class
     * @see #checkActiveUserEntity(SystemUser)
     * @return {@link UserDto}
     */
    @Override
    public UserDto addUser(UserDto user) {
        SystemUser found = this.userRepo.findById(user.getUsername()).orElse(null);
        if (found != null && checkActiveUserEntity(found)) {
            return null;
        }
        user.setAuthority(null);
        String locationCode = user.getLocation().getLocationCode();
        Location location = locationRepo.findById(locationCode).orElse(null);
        user.setLocation(new LocationDto(locationCode, location.getLocationName()));
        SystemUser userEntity = UserMapper.toEntity(user);
        int authorityId = authRepo.findAll().size() + 1;
        Authority newAuth = new Authority(authorityId, user.getType(), userEntity);
        this.userRepo.save(userEntity);
        this.authRepo.save(newAuth);
        userEntity.setAuthority(newAuth);
        this.userRepo.save(userEntity);
        return user;
    }

    /**
     * Update user with given username and new information
     * @param username the username of updated user
     * @param gender new gender
     * @param dateOfBirth new dateOfBirth
     * @param joinedDate new joinedDate
     * @param type new Type (Admin or Staff)
     * @see #findWithUsername(String)
     * @see #checkActiveUserEntity(SystemUser)
     * @return {@link UserDto}
     */
    @Override
    public UserDto updateUser(String username, String gender, Date dateOfBirth, Date joinedDate, String type) {
        SystemUser found = this.findWithUsername(username);
        if (found == null || !checkActiveUserEntity(found)) {
            return null;
        }
        found.setBirthDate(dateOfBirth);
        found.setJoinedDate(joinedDate);
        found.setGender(gender);
        found.setType(type);
        found.getAuthority().setAuthority(type);
        this.userRepo.save(found);
        return UserMapper.toDto(found);
    }

    /**
     * Change password in first login case, set user's first time to 0
     * @param username user's username
     * @param newPW new password
     * @return {@link String}
     */
    @Override
    public String changePassword(String username, String newPW) {
        SystemUser found = this.userRepo.findById(username).orElse(null);
        found.setPassword(new BcryptPassword().passwordEncoding(newPW));
        found.setFirstTime(0);
        this.userRepo.save(found);
        return "Update password success";
    }

    /**
     * Return list of user with given string or user type
     * @param input given string to search for fullName or staffCode
     * @param locationCode user's locationCode
     * @param type  user's type (Admin or Staff)
     * @see #viewUser(String, String)
     * @return {@link List<UserDto>}
     */
    @Override
    public List<UserDto> searchWithGivenString(String input, String locationCode, String type) {
        input = input.trim();
        if ((input == null || input.equals("")) && (type == null || type.equals(""))) {
            return this.viewUser(locationCode, "");
        }
        String inputLower = input.toLowerCase();
        if (type == null || type.equals("")) {
            return this.viewUser(locationCode, "").stream().filter(s -> s.getStaffCode().toLowerCase().contains(inputLower)
                    || s.getFullName().toLowerCase().contains(inputLower)).collect(Collectors.toList());
        }
        if (input == null || input.equals("")) {
            return this.viewUser(locationCode, "").stream().filter(s -> s.getType().equals(type)).collect(Collectors.toList());
        }
        return this.viewUser(locationCode, "").stream().filter(s -> (s.getStaffCode().toLowerCase().contains(inputLower)
                || s.getFullName().toLowerCase().contains(inputLower)) && s.getType().equals(type)).collect(Collectors.toList());
    }

    /**
     * Return active userlist with given location and user with given username is on top of the list
     * @param locationCode user's locationCode
     * @param username user's username
     * @see #findAll()
     * @return {@link List<UserDto>}
     */
    @Override
    public List<UserDto> viewUser(String locationCode, String username) {
        List<UserDto> before = this.findAll().stream().filter(s -> s.getLocation().getLocationCode().equals(locationCode)).collect(Collectors.toList());
        if (username == null || username.equals("")) {
            return before;
        }
        List<UserDto> theChosenList = before.stream().filter(s -> s.getUsername().equals(username)).collect(Collectors.toList());
        if (theChosenList.size() != 0) {
            UserDto theChosenOne = theChosenList.get(0);
            List<UserDto> result = before.stream().filter(s -> !s.getUsername().equals(username)).collect(Collectors.toList());
            result.add(0, theChosenOne);
            return result;
        }
        return before;
    }
    /**
     * Check if a user is active or not
     * @param user user entity to check
     * @return {@link Boolean}
     */
    public boolean checkActiveUserEntity(SystemUser user) {
        return user.getState() != 0;
    }

    /**
     * Change password
     * @param username user's username
     * @param password user's new password
     * @see #findWithUsername(String)
     * @return {@link Integer}
     */
    @Override
    public int changePasswordOption(String username, String password) {
        SystemUser check = findWithUsername(username);
        if (check == null) {
            return 0;
        }
        check.setPassword(new BcryptPassword().passwordEncoding(password));
        this.userRepo.save(check);
        return 1;
    }

    /**
     * Check if user can be disabled or not
     * @param username user's username
     * @see #checkActiveUserEntity(SystemUser)
     * @return {@link Integer}
     */
    @Override
    public int checkDisableByUsername(String username) {
        SystemUser found = this.userRepo.findById(username).orElse(null);
        List<Assignment> checkedList = this.assignRepo.getAssignmentByUsername(username);
        if (checkedList.size() != 0) {
            return 0;
        }
        if (found == null || !checkActiveUserEntity(found)) {
            return 0;
        }
        return 1;
    }
}
