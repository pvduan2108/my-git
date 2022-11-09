package com.nt.rookie.post.repository;

import com.nt.rookie.post.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {
    @Query(value = "select * from assignment assign where (assign.assigned_to like :username or assign.assigned_by like :username " +
            "or assign.accepted_by like :username or assign.requested_by like :username) and assign.state != 4 and assign.state != 3", nativeQuery = true)
    List<Assignment> getAssignmentByUsername(String username);

    @Query(value = "select assign from Assignment assign where assign.id = :id")
    Assignment getAssignmentById(int id);

    @Query("from Assignment a where a.id<>:id and a.assignedTo.location.locationCode=:locationCode and a.state<>3 order by a.id asc")
    List<Assignment> getAssignmentExceptId(@Param("locationCode") String locationCode,@Param("id") int id);

    @Query("from Assignment a where a.state<>3 and a.assignedTo.location.locationCode=:locationCode order by a.id asc")
    List<Assignment> getAllByLocation(@Param("locationCode") String locationCode);

    @Query("from Assignment a where a.state not in (3,4) and a.assignedTo.username=:username and a.assignedDate<=current_date() order by a.asset.assetCode asc")
    List<Assignment> getAssignmentsByUserBeforeToday(@Param("username") String username);

    @Query("from Assignment a where a.state not in (3,4) and a.assignedTo.username=:username and a.assignedDate<=current_date() and a.id<>:id order by a.asset.assetCode asc")
    List<Assignment> getAssignmentsByUserBeforeTodayExceptId(@Param("username")String username, @Param("id")int id);

    @Query("from Assignment a where a.asset.assetCode=:assetCode")
    List<Assignment> getAssignmentsByAssetCode(@Param("assetCode") String assetCode);
}
