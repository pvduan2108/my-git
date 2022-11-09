package com.nt.rookie.post.repository;

import com.nt.rookie.post.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, String> {
}
