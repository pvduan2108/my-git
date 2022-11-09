package com.nt.rookie.post.service;

import com.nt.rookie.post.dto.CategoryDto;
import com.nt.rookie.post.model.Category;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> findAll();

    CategoryDto createCategory(CategoryDto categoryDto);

    Category findById(String categoryCode);
}
