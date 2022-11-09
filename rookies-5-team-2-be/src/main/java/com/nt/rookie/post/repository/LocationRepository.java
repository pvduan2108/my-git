package com.nt.rookie.post.repository;

import com.nt.rookie.post.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, String> {
}
