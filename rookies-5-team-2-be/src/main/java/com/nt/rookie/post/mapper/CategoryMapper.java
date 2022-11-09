package com.nt.rookie.post.mapper;

import com.nt.rookie.post.dto.CategoryDto;
import com.nt.rookie.post.model.Category;

import java.util.List;
import java.util.stream.Collectors;

public class CategoryMapper {
    public static CategoryDto toDto(Category category) {
        CategoryDto result = new CategoryDto();
        result.setCategoryCode(category.getCategoryCode());
        result.setCategoryName(category.getCategoryName());
        result.setMaxAssetCode(category.getMaxAssetCode());
        return result;
    }

    public static Category toEntity(CategoryDto categoryDto) {
        Category result = new Category();
        result.setCategoryCode(categoryDto.getCategoryCode());
        result.setCategoryName(categoryDto.getCategoryName());
        result.setMaxAssetCode(categoryDto.getMaxAssetCode());
        return result;
    }

    public static List<CategoryDto> toDtoList(List<Category> entities) {
        return entities.stream().map(CategoryMapper::toDto).collect(Collectors.toList());
    }
    public static List<Category> toEntityList(List<CategoryDto> categoryDtoList) {
        return categoryDtoList.stream().map(CategoryMapper::toEntity).collect(Collectors.toList());
    }

}
