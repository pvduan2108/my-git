package com.nt.rookie.post.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Category {
    @Id
    @Column(name = "category_code")
    private String categoryCode;

    @Column(name = "name")
    private String categoryName;

    @Column(name = "max_asset_code")
    private Integer maxAssetCode;

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Integer getMaxAssetCode() {
        return maxAssetCode;
    }

    public void setMaxAssetCode(Integer maxAssetCode) {
        this.maxAssetCode = maxAssetCode;
    }
}
