package com.nt.rookie.post.controller.entityController;

import com.nt.rookie.post.dto.CategoryDto;
import com.nt.rookie.post.mapper.CategoryMapper;
import com.nt.rookie.post.model.Category;
import com.nt.rookie.post.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Validated
@CrossOrigin
@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService cateService;

    public CategoryController(CategoryService cateService) {
        this.cateService = Objects.requireNonNull(cateService);
    }

    @GetMapping("/")
    public ResponseEntity<List<CategoryDto>> getAll() {
        return new ResponseEntity<>(cateService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<CategoryDto> createdCategory(@RequestBody @Valid CategoryDto categoryDto) throws Exception {
        List<Category> list = CategoryMapper.toEntityList(this.cateService.findAll());
        List<String> found1 = list.stream().map(category -> category.getCategoryName()).collect(Collectors.toList());
        List<String> found2 = list.stream().map(category -> category.getCategoryCode()).collect(Collectors.toList());

        if (found1.contains(categoryDto.getCategoryName()) ||found2.contains(categoryDto.getCategoryCode())) {
            return new ResponseEntity<>(categoryDto, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(cateService.createCategory(categoryDto), HttpStatus.CREATED);
    }
}
