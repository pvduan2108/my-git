package com.nt.rookie.post.service.impl;

import com.nt.rookie.post.dto.LocationDto;
import com.nt.rookie.post.dto.UserDto;
import com.nt.rookie.post.mapper.UserMapper;
import com.nt.rookie.post.model.Assignment;
import com.nt.rookie.post.model.Authority;
import com.nt.rookie.post.model.Location;
import com.nt.rookie.post.model.SystemUser;
import com.nt.rookie.post.repository.AssignmentRepository;
import com.nt.rookie.post.repository.AuthorityRepository;
import com.nt.rookie.post.repository.LocationRepository;
import com.nt.rookie.post.repository.UserRepository;
import com.nt.rookie.post.util.BcryptPassword;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.junit.jupiter.params.provider.Arguments;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.mockito.quality.Strictness.LENIENT;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = LENIENT)
class UserServiceImplTest {

    @Mock
    private static UserRepository userRepo;
    @Mock
    private static AssignmentRepository assignRepo;
    @Mock
    private static AuthorityRepository authorRepo;
    @Mock
    private static LocationRepository locationRepo;
    @InjectMocks
    private static UserServiceImpl userService;

    private static Stream<Arguments> testDataForUsername() {
        return Stream.of(
                Arguments.of(1, "quannk"),
                Arguments.of(0, "binhnv1")
        );
    }

    @Nested
    @DisplayName("No input methods")
    class noInput {
        @Test
        void getDataNumber() {
            List<SystemUser> userList = new ArrayList<>();
            when(userRepo.findAll()).thenReturn(userList);
            int a = userService.getDataNumber();
            assertEquals(a, userList.size());
        }
        @Test
        void findAll() {
            List<SystemUser> userList = new ArrayList<>();
            when(userRepo.findAll()).thenReturn(userList);
            int a = userList.stream().filter(s -> s.getState() == 1).collect(Collectors.toList()).size();
            int b = userService.findAll().size();
            assertEquals(a, b);
        }
    }

    @Nested
    @DisplayName("Username input methods")
    class usernameInput {
        @ParameterizedTest
        @MethodSource("com.nt.rookie.post.service.impl.UserServiceImplTest#testDataForUsername")
        void getDuplicateUsername(int state, String username) {
            List<SystemUser> userList = new ArrayList<>();
            when(userRepo.findAll()).thenReturn(userList);
            int a = userList.stream().filter(s -> s.getUsername().equals(username)).collect(Collectors.toList()).size();
            int b = userService.getDuplicateUsername(username);
            assertEquals(a,b);
        }

        @ParameterizedTest
        @MethodSource("com.nt.rookie.post.service.impl.UserServiceImplTest#testDataForUsername")
        void findByUsername(int state, String username) {
            SystemUser user = new SystemUser();
            UserDto userDto = new UserDto();
            user.setUsername(username);
            user.setState(state);
            userDto.setState(state);
            when(userRepo.findById(Mockito.anyString())).thenReturn(Optional.of((SystemUser) user));
            try (MockedStatic<UserMapper> mapper = Mockito.mockStatic(UserMapper.class)) {
                mapper.when(() -> UserMapper.toDto(Mockito.any(SystemUser.class))).thenReturn(userDto);
                UserDto a = userService.findByUsername(username);
                if (user.getState() == 0) {
                    assertNull(a);
                } else {
                    assertEquals(a.getState(), 1);
                }
            }

        }

        @ParameterizedTest
        @MethodSource("com.nt.rookie.post.service.impl.UserServiceImplTest#testDataForUsername")
        void findWithUsername(int state, String username) {
            SystemUser user = new SystemUser();
            user.setUsername(username);
            user.setState(state);
            when(userRepo.findById(Mockito.anyString())).thenReturn(Optional.of((SystemUser) user));
            SystemUser a = userService.findWithUsername(username);
            if(user.getState() == 0) {
                assertNull(a);
            } else {
                assertEquals(a.getState(), 1);
            }
        }

        @ParameterizedTest
        @MethodSource("com.nt.rookie.post.service.impl.UserServiceImplTest#testDataForUsername")
        void disableByUsername(int state, String username) {
            SystemUser user = new SystemUser();
            user.setState(state);
            user.setUsername(username);
            List<Assignment> list = new ArrayList<>();
            list.add(new Assignment());
            when(userRepo.findById(Mockito.anyString())).thenReturn(Optional.of((SystemUser) user));
            when(assignRepo.getAssignmentByUsername(Mockito.anyString())).thenReturn(list);
            int a = userService.disableByUsername(username);
            if (user.getState() == 0) {
                assertEquals(a, 0);
            } else {
                assertEquals(a, 0);
            }
        }

        @ParameterizedTest
        @MethodSource("com.nt.rookie.post.service.impl.UserServiceImplTest#testDataForUsername")
        void checkDisableByUsername(int state, String username) {
            SystemUser user = new SystemUser();
            user.setState(state);
            user.setUsername(username);
            List<Assignment> list = new ArrayList<>();
            list.add(new Assignment());
            when(userRepo.findById(Mockito.anyString())).thenReturn(Optional.of((SystemUser) user));
            when(assignRepo.getAssignmentByUsername(Mockito.anyString())).thenReturn(list);
            int a = userService.disableByUsername(username);
            if (user.getState() == 0) {
                assertEquals(a, 0);
            } else {
                assertEquals(a, 0);
            }
        }

    }


    @Test
    void addUser() {
        UserDto dto = new UserDto();
        dto.setFirstName("Quân");
        dto.setLastName("Nguyễn Văn");
        dto.setUsername("quann");
        dto.setJoinedDate(new Date());
        dto.setBirthDate(new Date());
        dto.setState(1);
        dto.setFirstTime(1);
        Location location = new Location();
        dto.setLocation(new LocationDto("HN", location.getLocationName()));
        SystemUser user = UserMapper.toEntity(dto);
        Authority newAuth = new Authority(1, "Admin", user);
        user.setAuthority(newAuth);
        List<Authority> a = new ArrayList<>();
        try (MockedStatic<UserMapper> mapper = Mockito.mockStatic(UserMapper.class)) {
            when(userRepo.findById(Mockito.anyString())).thenReturn(Optional.of((SystemUser) new SystemUser()));
            when(locationRepo.findById(Mockito.anyString())).thenReturn(Optional.of((Location) new Location()));
            mapper.when(() -> UserMapper.toEntity(Mockito.any(UserDto.class))).thenReturn(new SystemUser());
            when(authorRepo.findAll()).thenReturn(a);
            when(userRepo.save(Mockito.any(SystemUser.class))).thenReturn(new SystemUser());
            when(authorRepo.save(Mockito.any(Authority.class))).thenReturn(newAuth);
            when(userRepo.save(Mockito.any(SystemUser.class))).thenReturn(user);
            assertEquals(user.getUsername(), userService.addUser(dto).getUsername());
        }

    }

    @Test
    void updateUser() {
        String username = "quann";
        String gender = "Male";
        Date dOB = new Date();
        Date jD = new Date();
        String type = "Admin";
        UserDto dto = new UserDto();
        dto.setFirstName("Quân");
        dto.setLastName("Nguyễn Văn");
        dto.setUsername(username);
        dto.setGender(gender);
        dto.setJoinedDate(dOB);
        dto.setBirthDate(jD);
        dto.setType(type);
        SystemUser user = UserMapper.toEntity(dto);
        user.setState(0);
        try (MockedStatic<UserMapper> mapper = Mockito.mockStatic(UserMapper.class)) {
            when(userRepo.save(Mockito.any(SystemUser.class))).thenReturn(user);
            mapper.when(() -> UserMapper.toDto(Mockito.any(SystemUser.class))).thenReturn(dto);
            UserDto a = userService.updateUser(username, gender, dOB, jD, type);
            assertNull(a);
        }

    }

    @Test
    void changePassword() {
        String username = "quannk";
        String pw = "123456";
        String newPw = "12345";
        SystemUser user = new SystemUser();
        user.setPassword(new BcryptPassword().passwordEncoding(pw));
        user.setState(1);
        user.setUsername(username);
        when(userRepo.findById(Mockito.anyString())).thenReturn(Optional.of((SystemUser) user));
        when(userRepo.save(Mockito.any(SystemUser.class))).thenReturn(user);
        String ntf = userService.changePassword(username, newPw);
        assertEquals(ntf, "Update password success");
    }

    @Test
    void searchWithGivenString() {

    }

    @Test
    void viewUser() {
        List<UserDto> list = new ArrayList<>();
        String locationCode = "HN";
        String username = "";
        assertNotNull(userService.viewUser(locationCode, username));
    }

    @Test
    void checkActiveUserEntity() {
        SystemUser user = new SystemUser();
        user.setState(0);
        boolean result = userService.checkActiveUserEntity(user);
        assertEquals(false, result );
    }

    @Test
    void changePasswordOption() {
        String username = "quannk";
        String pw = "123456";
        String newPw = "12345";
        SystemUser user = new SystemUser();
        user.setPassword(new BcryptPassword().passwordEncoding(pw));
        user.setState(1);
        user.setUsername(username);
        when(userRepo.findById(Mockito.anyString())).thenReturn(Optional.of((SystemUser) user));
        when(userRepo.save(Mockito.any(SystemUser.class))).thenReturn(user);
        int ntf = userService.changePasswordOption(username, newPw);
        assertEquals(ntf, 1);
    }
}