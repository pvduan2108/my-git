package com.nt.rookie.post.service.impl;

import com.nt.rookie.post.dto.CategoryDto;
import com.nt.rookie.post.mapper.CategoryMapper;
import com.nt.rookie.post.model.Category;
import com.nt.rookie.post.repository.CategoryRepository;
import com.nt.rookie.post.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository cateRepo;

    public CategoryServiceImpl(CategoryRepository cateRepo) {
        this.cateRepo = cateRepo;
    }

    @Override
    public List<CategoryDto> findAll() {
        List<CategoryDto> result = CategoryMapper.toDtoList(this.cateRepo.findAll());
      
        List<CategoryDto> finalList = result.stream().sorted(Comparator.comparing
                        (CategoryDto::getCategoryName, String::compareToIgnoreCase))
                .collect(Collectors.toList());

        return finalList;
    }

    public CategoryDto createCategory( CategoryDto categoryDto) {
        if(categoryDto.getMaxAssetCode()==null)
            categoryDto.setMaxAssetCode(0);
        Category category = this.cateRepo.save(CategoryMapper.toEntity(categoryDto));
        return CategoryMapper.toDto(category);
    }
    @Override
    public Category findById(String categoryCode) {
        Category category = this.cateRepo.findById(categoryCode).orElse(null);
        return category;
    }
}
