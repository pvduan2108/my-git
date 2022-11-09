package com.nt.rookie.post.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
public class CategoryDto {

    @Pattern(regexp = "^[a-zA-Z0-9]*$")
    @NotEmpty(message = "Category code can't be empty")
    @Size(max = 3, message = "Category code is too long")
    String categoryCode;

    @Size(max = 50, message = "Category name is too long")
    String categoryName;

    @Min(value=0)
    Integer maxAssetCode;
}
