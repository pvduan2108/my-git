package com.nt.rookie.post.controller.entityController;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.nt.rookie.post.dto.UserDto;
import com.nt.rookie.post.service.UserService;
import com.nt.rookie.post.util.UserGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.nt.rookie.post.util.DateUtil;

import javax.validation.Valid;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Objects;


@CrossOrigin
@RestController
@RequestMapping("/user")
//@PreAuthorize("hasAuthority('ADMIN')")
public class UserController {
    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = Objects.requireNonNull(userService);
    }

    /**
     * Return response with list of all active user
     * @return {@link ResponseEntity<List>}
     */
    @GetMapping("/search/")
    public ResponseEntity<List<UserDto>> getAll() {
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    /**
     * Return response contain list of user with given locationCode.
     * User has same username as given username is on top of list
     * @param objectNode contain locationCode and username
     * @return {@link ResponseEntity<List>}
     */
    @PostMapping("/view/")
    public ResponseEntity<List<UserDto>> viewUser(@RequestBody ObjectNode objectNode) {
        String locationCode = objectNode.get("locationCode").asText();
        String username = objectNode.get("username").asText();
        return new ResponseEntity<>(userService.viewUser(locationCode, username), HttpStatus.OK);
    }

    /**
     * Unused method
     * Return response contain user found by given username
     * @param username username to find user
     * @return {@link ResponseEntity<UserDto>}
     */
    @GetMapping("/{username}")
    public ResponseEntity<UserDto> getById(@PathVariable String username) {
        return new ResponseEntity<>(userService.findByUsername(username), HttpStatus.OK);
    }

    /**
     * Return response contain list of user found with given search information
     * @param objectNode contain string to search fullName or staffCode, locationCode, type(Admin or Staff)
     * @return {@link ResponseEntity<List>}
     */
    @PostMapping("/search")
    public ResponseEntity<List<UserDto>> search(@RequestBody ObjectNode objectNode) {
        String input = objectNode.get("input").asText();
        String locationCode = objectNode.get("locationCode").asText();
        String type = objectNode.get("type").asText();
        return new ResponseEntity<>(userService.searchWithGivenString(input, locationCode, type), HttpStatus.OK);
    }
    /**
     * Disable user with given username
     * @param username user's username to disable
     * @return {@link ResponseEntity<Integer>}
     */

    @DeleteMapping("/{username}")
    public ResponseEntity<?> disableUser(@PathVariable String username) {
        int let = userService.disableByUsername(username);
        if (let == 0) {
            return new ResponseEntity<>(let, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(let, HttpStatus.OK);
    }

    /**
     * Update user
     * @param objectNode contain username, gender, type, dateOfBirth, joinedDate
     * @return {@link ResponseEntity}
     */
    @PutMapping("/")
    public ResponseEntity<?> updateUser(@RequestBody ObjectNode objectNode) throws ParseException {
        Date thisDay = Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date dateOfBirth = new SimpleDateFormat("yyyy-MM-dd").parse(objectNode.get("dateOfBirth").asText());
        Date joinedDate = new SimpleDateFormat("yyyy-MM-dd").parse(objectNode.get("joinedDate").asText());
        if (((thisDay.getTime() - dateOfBirth.getTime()) / (1000l * 60 * 60 * 24 * 365) >= 18) && (joinedDate.getTime() - dateOfBirth.getTime() > 0)) {
            String username = objectNode.get("username").asText();
            String gender = objectNode.get("gender").asText();
            String type = objectNode.get("type").asText();
            return new ResponseEntity<>(userService.updateUser(username, gender, dateOfBirth, joinedDate, type), HttpStatus.OK);
        }
        return new ResponseEntity<>("Bad Request", HttpStatus.BAD_REQUEST);
    }

    /**
     * Check if user can be disabled or not
     * @param username user's username to disable
     * @return {@link ResponseEntity}
     */
    @GetMapping("/disable/{username}")
    public ResponseEntity<?> findDisableUser(@PathVariable String username) {
        int let = userService.checkDisableByUsername(username);
        System.out.println("result is: " + let);
        if (let == 0) {
            return new ResponseEntity<>(let, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(let, HttpStatus.OK);
    }

    /**
     * Create user with given information
     * @param userDto
     * @throws ParseException if can not parse date
     * @return {@link ResponseEntity}
     */
    @PostMapping("/")
    public ResponseEntity<?> createUser(@RequestBody @Valid UserDto userDto) throws ParseException {
        String username = new UserGenerator().usernameGen(userDto.getFirstName(), userDto.getLastName());
        if (username == null) {
            return new ResponseEntity<>("Bad Request", HttpStatus.BAD_REQUEST);
        }
        UserDto validatedOne = new UserDto();
        int checkUsernameExistence = userService.getDuplicateUsername(username);
        if (checkUsernameExistence == 0) {
            validatedOne = new UserGenerator().newUser(userDto, this.userService.getDataNumber(), username);
        } else if (checkUsernameExistence == 1) {
            validatedOne = new UserGenerator().newUser(userDto, this.userService.getDataNumber(), username + Integer.toString(checkUsernameExistence));
        } else {
            validatedOne = new UserGenerator().newUser(userDto, this.userService.getDataNumber(), username + Integer.toString(checkUsernameExistence));

        }
        if (validatedOne == null) {
            return new ResponseEntity<>("Bad Request", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(userService.addUser(validatedOne), HttpStatus.OK);
    }
}
