package com.nt.rookie.post.service.impl;

import com.nt.rookie.post.dto.AssetDto;
import com.nt.rookie.post.dto.AssignmentDto;
import com.nt.rookie.post.dto.UserDto;
import com.nt.rookie.post.mapper.AssetMapper;
import com.nt.rookie.post.mapper.AssignmentMapper;
import com.nt.rookie.post.mapper.UserMapper;
import com.nt.rookie.post.model.Asset;
import com.nt.rookie.post.model.Assignment;
import com.nt.rookie.post.model.Authority;
import com.nt.rookie.post.model.Category;
import com.nt.rookie.post.model.SystemUser;
import com.nt.rookie.post.repository.AssetRepository;
import com.nt.rookie.post.repository.AssignmentRepository;
import com.nt.rookie.post.repository.UserRepository;
import com.nt.rookie.post.service.impl.AssignmentServiceImpl;
import com.nt.rookie.post.util.AssignmentState;
import com.nt.rookie.post.util.DateUtil;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AssignmentServiceImplTest {
	@Mock
	private AssignmentRepository assignmentRepo;
	@Mock
	private AssetRepository assetRepo;
	@Mock
	private UserRepository userRepo;
	@InjectMocks
	private AssignmentServiceImpl service;

	private static Stream<Arguments> argumentsForCreateAssignment() {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		AssignmentDto assignment1 = new AssignmentDto();
		assignment1.setState(AssignmentState.ACCEPTED);
		assignment1.setAssignedDate(formatter.format(new Date()));
		AssignmentDto assignment2 = new AssignmentDto();
		assignment2.setState(AssignmentState.ACCEPTED);
		assignment2.setAcceptedBy("abc");
		assignment2.setAssignedDate(formatter.format(new Date()));
		AssignmentDto assignment3 = new AssignmentDto();
		assignment3.setState(AssignmentState.ACCEPTED);
		assignment3.setReturnDate(formatter.format(new Date()));
		assignment3.setAssignedDate(formatter.format(new Date()));
		AssignmentDto assignment4 = new AssignmentDto();
		assignment4.setState(AssignmentState.ACCEPTED);
		assignment4.setReturnDate(formatter.format(new Date()));
		assignment4.setAcceptedBy("abc");
		assignment4.setAssignedDate(formatter.format(new Date()));
		AssignmentDto assignment5 = new AssignmentDto();
		assignment5.setAssignedDate(formatter.format(new Date()));
		AssignmentDto assignment6 = new AssignmentDto();
		assignment6.setAcceptedBy("abc");
		assignment6.setAssignedDate(formatter.format(new Date()));
		AssignmentDto assignment7 = new AssignmentDto();
		assignment7.setReturnDate(formatter.format(new Date()));
		assignment7.setAssignedDate(formatter.format(new Date()));
		AssignmentDto assignment8 = new AssignmentDto();
		assignment8.setReturnDate(formatter.format(new Date()));
		assignment8.setAcceptedBy("abc");
		assignment8.setAssignedDate(formatter.format(new Date()));
		Stream<Arguments> stream = Stream.of(
				Arguments.of(assignment1, true), 
				Arguments.of(assignment2, true),
				Arguments.of(assignment3,true),
				Arguments.of(assignment4,true),
				Arguments.of(assignment5,true),
				Arguments.of(assignment6,true),
				Arguments.of(assignment7,true),
				Arguments.of(assignment8,true)
				);
		return stream;
	}

	// Tests for getAll()
	@Test
	@DisplayName("Return empty array when repo call getAllByLocation. Expect: null")
	void getAll1() {
		when(assignmentRepo.getAllByLocation("DN")).thenReturn(new ArrayList<>());
		assertNull(service.getAll("DN", "null"));
	}
	@Test
	@DisplayName("Repo.getAllByLocation return not empty. id=null")
	void getAll2() {
		Assignment assignment = new Assignment();
		List<Assignment> assignments = List.of(assignment);
		when(assignmentRepo.getAllByLocation("DN")).thenReturn(assignments);
		try (MockedStatic<AssignmentMapper> mapper = Mockito.mockStatic(AssignmentMapper.class)) {
			mapper.when(() -> AssignmentMapper.toDtoList(assignments)).thenReturn(new ArrayList<AssignmentDto>());
			assertNotNull(service.getAll("DN", "null"));
		}
	}

	@Test
	void getAll3() {
		Assignment assignment1 = new Assignment();
		Assignment assignment2 = new Assignment();
		List<Assignment> assignments = List.of(assignment1, assignment2);
		List<Assignment> theOthers = new ArrayList<>();
		theOthers.add(assignment2);
		when(assignmentRepo.getAllByLocation(null)).thenReturn(assignments);
		when(assignmentRepo.getAssignmentById(0)).thenReturn(assignment1);
		when(assignmentRepo.getAssignmentExceptId(null, 0)).thenReturn(theOthers);
		try (MockedStatic<AssignmentMapper> mapper = Mockito.mockStatic(AssignmentMapper.class)) {
			mapper.when(() -> AssignmentMapper.toDtoList(theOthers)).thenReturn(new ArrayList<AssignmentDto>());
			assertNotNull(service.getAll(null, "0"));
		}
	}

	// Tests for getUserAssignment()
	@Test
	void getUserAssignment() {
		List<Assignment> assignments = new ArrayList<>();
		when(assignmentRepo.getAssignmentsByUserBeforeToday(null)).thenReturn(assignments);
		assertNull(service.getUserAssignment(null, "null", null));
	}

	@Test
	void getUserAssignment1() {
		List<Assignment> assignments = new ArrayList<>();
		assignments.add(new Assignment());
		try (MockedStatic<AssignmentMapper> mapper = Mockito.mockStatic(AssignmentMapper.class)) {
			mapper.when(() -> AssignmentMapper.toDtoList(assignments)).thenReturn(new ArrayList<>());
			when(assignmentRepo.getAssignmentsByUserBeforeToday(null)).thenReturn(assignments);
			assertNotNull(service.getUserAssignment(null, "null", null));
		}
	}

	@Test
	void getUserAssignment2() {
		Assignment assignment1 = new Assignment();
		Assignment assignment2 = new Assignment();
		List<Assignment> assignments = new ArrayList<>();
		assignments.add(assignment1);
		assignments.add(assignment2);
		List<Assignment> theOthers = new ArrayList<>();
		theOthers.add(assignment2);
		when(assignmentRepo.getAssignmentsByUserBeforeToday(null)).thenReturn(assignments);
		when(assignmentRepo.getAssignmentById(0)).thenReturn(assignment1);
		when(assignmentRepo.getAssignmentsByUserBeforeTodayExceptId(null, 0)).thenReturn(theOthers);
		try (MockedStatic<AssignmentMapper> mapper = Mockito.mockStatic(AssignmentMapper.class)) {
			mapper.when(() -> AssignmentMapper.toDtoList(theOthers)).thenReturn(new ArrayList<AssignmentDto>());
			assertNotNull(service.getUserAssignment(null, "0", null));
		}
	}

	// Tests for getAssignmentByAssetCode()
	@Test
	void getAssignmentByAssetCode() {
		when(assignmentRepo.getAssignmentsByAssetCode(null)).thenReturn(new ArrayList<>());
		assertNull(service.getAssignmentByAssetCode(null));
	}

	@Test
	void getAssignmentByAssetCode1() {
		List<Assignment> assignments = new ArrayList<>();
		assignments.add(new Assignment());
		when(assignmentRepo.getAssignmentsByAssetCode(null)).thenReturn(assignments);
		try (MockedStatic<AssignmentMapper> mapper = Mockito.mockStatic(AssignmentMapper.class)) {
			mapper.when(() -> AssignmentMapper.toDtoList(assignments)).thenReturn(new ArrayList<>());
			assertNotNull(service.getAssignmentByAssetCode(null));
		}
	}

	// Tests for saveEditedAssignmentState()
	@Test
	void saveEditedAssignmentState() {
		AssignmentDto dto = new AssignmentDto();
		when(assignmentRepo.findById(dto.getId())).thenThrow(new NullPointerException("This's designed exception!"));
		assertEquals(0, service.saveEditedAssignmentState(dto));
	}

	// Test for saveEditedAssignmentState()
//	@Test
//	void saveEditedAssignmentState1() {
//		AssignmentDto dto = new AssignmentDto();
//		Assignment assignment = new Assignment();
//		assignment.setState(1);
//		Optional<Assignment> optAssignment = Optional.of(assignment);
//		when(assignmentRepo.findById(dto.getId())).thenReturn(optAssignment);
//		assertEquals(1, service.saveEditedAssignmentState(dto));
//	}
//	@Test
//	void saveEditedAssignmentState2() {
//		AssignmentDto dto = new AssignmentDto();
//		Assignment assignment = new Assignment();
//		assignment.setState(0);
//		Optional<Assignment> optAssignment = Optional.of(assignment);
//		when(assignmentRepo.findById(dto.getId())).thenReturn(optAssignment);
//		assertEquals(1, service.saveEditedAssignmentState(dto));
//	}

	// Test for createAssignment()
	@ParameterizedTest
	@MethodSource("argumentsForCreateAssignment")
	void createAssignment(AssignmentDto input, boolean expectation) {
		List<Assignment> assignments  = new ArrayList<>();
		for (int i = 0; i < 90; i++) {
			Assignment assignment = new Assignment();
			assignment.setId(i);
			assignments.add(assignment);
		}
		Optional<SystemUser> toUser = Optional.of(new SystemUser());
		Optional<SystemUser> byUser = Optional.of(new SystemUser());
		Optional<SystemUser> acceptedUser = Optional.of(new SystemUser());
		Optional<Asset> asset = Optional.of(new Asset());
		Assignment result = new Assignment();
		SystemUser userTo = new SystemUser();
		userTo.setAuthority(new Authority());
		result.setAssignedTo(userTo);
		SystemUser userBy = new SystemUser();
		userBy.setAuthority(new Authority());
		result.setAssignedBy(userBy);
		Asset asseT = new Asset();
		asseT.setCategory(new Category());
		result.setAsset(asseT);
		result.setAssignedDate(new Date());
		AssignmentDto resul = new AssignmentDto();
		when(assignmentRepo.findAll()).thenReturn(assignments);
		when(assignmentRepo.saveAndFlush(Mockito.any(Assignment.class))).thenReturn(result);
		when(userRepo.findById(input.getAssignedTo())).thenReturn(toUser);
		when(userRepo.findById(input.getAssignedBy())).thenReturn(byUser);
		when(userRepo.findById(input.getAcceptedBy())).thenReturn(acceptedUser);
		when(assetRepo.findById(input.getAssetCode())).thenReturn(asset);
		try(MockedStatic<DateUtil> dateUtil = Mockito.mockStatic(DateUtil.class)){
			dateUtil.when(()->DateUtil.convertToDate(input.getAssignedDate())).thenReturn(new Date());
		}
		try(MockedStatic<AssignmentMapper> mapper = Mockito.mockStatic(AssignmentMapper.class)){
			mapper.when(()->AssignmentMapper.toDto(result)).thenReturn(resul);
		}
		try(MockedStatic<UserMapper> umapper = Mockito.mockStatic(UserMapper.class)){
			umapper.when(()->UserMapper.toDto(Mockito.any(SystemUser.class))).thenReturn(new UserDto());
		}
		try(MockedStatic<AssetMapper> amapper = Mockito.mockStatic(AssetMapper.class)){
			amapper.when(()->AssetMapper.toDto(Mockito.any(Asset.class))).thenReturn(new AssetDto());
		}
		assertNotNull(service.createAssignment(input));
	}

	// Tests for updateAssignmentState()
	@Test
	void updateAssignmentState() {
		AssignmentDto dto = new AssignmentDto();
		when(assignmentRepo.findById(dto.getId())).thenThrow(new NullPointerException("This's designed exception!"));
		assertEquals(0, service.updateAssignment(dto, null));
	}

	@Test
	void updateAssignmentState1() {
		try (MockedStatic<AssignmentMapper> mapper = Mockito.mockStatic(AssignmentMapper.class)) {
			Assignment originAssignment = new Assignment();
			originAssignment.setAsset(new Asset());
			Optional<Assignment> assignment = Optional.of(originAssignment);
			Optional<SystemUser> toUser = Optional.of(new SystemUser());
			Optional<SystemUser> byUser = Optional.of(new SystemUser());
			Optional<SystemUser> reUser = Optional.of(new SystemUser());
			Optional<Asset> asset = Optional.of(new Asset());
			AssignmentDto dto = new AssignmentDto();
			Assignment result = new Assignment();
			when(assignmentRepo.findById(dto.getId())).thenReturn(assignment);
			when(userRepo.findById(dto.getAssignedTo())).thenReturn(toUser);
			when(userRepo.findById(dto.getAssignedBy())).thenReturn(byUser);
			when(assetRepo.findById(dto.getAssetCode())).thenReturn(asset);
			mapper.when(() -> AssignmentMapper.updateEntity(dto, assignment.get(), toUser.get(), byUser.get(),
					asset.get(), null)).thenReturn(result);
			when(assignmentRepo.saveAndFlush(result)).thenThrow(new RuntimeException());
			assertEquals(0, service.updateAssignment(dto, null));
		}
	}

	@Test
	void updateAssignmentState2() {
		try (MockedStatic<AssignmentMapper> mapper = Mockito.mockStatic(AssignmentMapper.class)) {
			Asset assetOld = new Asset();
			assetOld.setAssetCode("");
			Assignment assign = new Assignment();
			assign.setAsset(assetOld);
			Optional<Assignment> assignment = Optional.of(assign);
			Optional<SystemUser> toUser = Optional.of(new SystemUser());
			Optional<SystemUser> byUser = Optional.of(new SystemUser());
			Optional<SystemUser> reUser = Optional.of(new SystemUser());
			Optional<Asset> assetNew = Optional.of(new Asset());
			AssignmentDto dto = new AssignmentDto();
			Assignment result1 = new Assignment();
			when(assignmentRepo.findById(dto.getId())).thenReturn(assignment);
			when(userRepo.findById(dto.getAssignedTo())).thenReturn(toUser);
			when(userRepo.findById(dto.getAssignedBy())).thenReturn(byUser);
			when(userRepo.findById(dto.getAssignedBy())).thenReturn(reUser);
			when(assetRepo.findById(Mockito.anyString())).thenReturn(Optional.of(new Asset()));
			when(assetRepo.findById(dto.getAssetCode())).thenReturn(assetNew);
			mapper.when(() -> AssignmentMapper.updateEntity(dto, assignment.get(), toUser.get(), byUser.get(),
					assetNew.get(), null)).thenReturn(result1);
			assertEquals(1, service.updateAssignment(dto, null));
		}
	}

	// Tests for deleteAssignment()
	@Test
	void deleteAssignment() {
		Assignment assignment = new Assignment();
		when(assignmentRepo.getAssignmentById(0)).thenReturn(assignment);
		AssignmentDto dto = new AssignmentDto();
		Asset asset = new Asset();
		asset.setAssetCode("");
		when(assetRepo.findById(dto.getAssetCode())).thenReturn(Optional.of(asset));
		try (MockedStatic<AssignmentMapper> mapper = Mockito.mockStatic(AssignmentMapper.class)) {
			mapper.when(() -> AssignmentMapper.toDto(assignment)).thenReturn(dto);
			assertEquals(dto, service.deleteAssignment(0));
			mapper.when(()->AssignmentMapper.toDto(assignment)).thenReturn(dto);
		}
	}
}