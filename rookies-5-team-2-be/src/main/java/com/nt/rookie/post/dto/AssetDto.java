package com.nt.rookie.post.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@Getter
@Setter
public class AssetDto {
    private String assetCode;

//    @Pattern(regexp = "^[a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂ" +
//            "ưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$")
    @NotEmpty(message = "Asset name can't be empty")
    @Size(max = 50, message = "Asset name is too long")
    private String assetName;

    private CategoryDto category;

    @NotEmpty(message = "Asset state can't be empty")
    @Size(max = 50, message = "Asset state is too long")
    private String state;

    @Size(max = 1500, message = "Field too long")
    private String specification;
    private Date installedDate;
    private LocationDto location;
}
