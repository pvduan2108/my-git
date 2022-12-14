package com.nt.rookie.post.repository;

import com.nt.rookie.post.model.Assignment;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;


public interface ReturnRequestRepository extends JpaRepository<Assignment, Integer>, JpaSpecificationExecutor<Assignment> {

    List<Assignment> findAll(Specification<Assignment> specification);
}
