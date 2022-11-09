package com.nt.rookie.post.model;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.Date;

@Entity
public class Asset {
    @Id
    @GeneratedValue(generator = "asset-generator")
    @GenericGenerator(name = "asset-generator",
            parameters = @org.hibernate.annotations.Parameter(name = "prefix", value = ""),
            strategy = "com.nt.rookie.post.util.AssetCodeGenerator")
    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "name")
    private String assetName;

    @ManyToOne
    @JoinColumn(name = "category_code")
    private Category category;

    @Column(name = "state")
    private int state;

    @Column(name = "specification")
    private String specification;

    @Column(name = "installed_date")
    private Date installedDate;

    @ManyToOne
    @JoinColumn(name = "location_code")
    private Location location;

    public String getAssetCode() {
        return assetCode;
    }

    public void setAssetCode(String assetCode) {
        this.assetCode = assetCode;
    }

    public String getAssetName() {
        return assetName;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public Date getInstalledDate() {
        return installedDate;
    }

    public void setInstalledDate(Date installedDate) {
        this.installedDate = installedDate;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
