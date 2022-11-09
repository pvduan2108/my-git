package com.nt.rookie.post.service.impl;


import com.nt.rookie.post.dto.AssetDto;
import com.nt.rookie.post.dto.ReportPOJO;
import com.nt.rookie.post.dto.UserDto;
import com.nt.rookie.post.mapper.AssetMapper;
import com.nt.rookie.post.mapper.AssetStateMapper;
import com.nt.rookie.post.model.Asset;
import com.nt.rookie.post.model.Category;
import com.nt.rookie.post.model.SystemUser;
import com.nt.rookie.post.repository.AssetRepository;
import com.nt.rookie.post.repository.CategoryRepository;
import com.nt.rookie.post.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssetServiceImpl implements AssetService {
    @Autowired
    private AssetRepository assetRepo;
    @Autowired
    private CategoryRepository categoryRepo;

    public AssetServiceImpl(AssetRepository assetRepo) {
        this.assetRepo = assetRepo;
    }
    /**
     * Get the list of all asset
     * @see #findAll()
     * @return {@link List<AssetDto>}
     */
    @Override
    public List<AssetDto> findAll() {
        return AssetMapper.toDtoList(this.assetRepo.findAll());
    }
    /**
     * Find asset with given assetCode, return dto
     * @param code assetcode used to find asset
     * @see #findByAssetCode(String)
     * @return {@link AssetDto}
     */
    @Override
    public AssetDto findByAssetCode(String code) {

        Asset found = this.assetRepo.findById(code).orElse(null);
        if (found == null) {
            return null;
        }
        return AssetMapper.toDto(found);
    }
    /**
     * Find asset with given assetCode, return entity
     * @param code assetcode used to find asset
     * @see #findByAssetCode(String)
     * @return {@link Asset}
     */
    @Override
    public Asset findWithAssetCode(String code) {
        Asset found = this.assetRepo.findById(code).orElse(null);
        return found;
    }
    /**
     * Return assetList with given location and asset with given assetCode is on top of the list and have state like Available, Not Available and Assigned
     * @param locationCode user's locationCode
     * @param assetCode asset's assetCode
     * @see #findAll()
     * @return {@link List<AssetDto>}
     */
    @Override
    public List<AssetDto> viewAsset(String locationCode, String assetCode) {
        List<AssetDto> firstList = this.findAll().stream().filter(s -> s.getLocation().getLocationCode().equals(locationCode))
                .filter(s -> s.getState().equals("Available") || s.getState().equals("Not Available") || s.getState().equals("Assigned"))
                .collect(Collectors.toList());
        if (assetCode == null || assetCode.equals("")) {
            return firstList;
        }
        List<AssetDto> theChosenList = firstList.stream().filter(s -> s.getAssetCode().equals(assetCode))
                .collect(Collectors.toList());
        if (theChosenList.size() != 0) {
            AssetDto newestChanged = theChosenList.get(0);
            List<AssetDto> result = firstList.stream().filter(s -> !s.getAssetCode().equals(assetCode))
                    .collect(Collectors.toList());
            result.add(0, newestChanged);
            return result;
        }
        return firstList;
    }

    /**
     * Return assetList with given location and asset with given assetCode is on top of the list
     * @param locationCode user's locationCode
     * @param assetCode asset's assetCode
     * @see #findAll()
     * @return {@link List<AssetDto>}
     */
    @Override
    public List<AssetDto> viewAssetDefault(String locationCode, String assetCode) {
        List<AssetDto> firstList = this.findAll().stream().filter(s -> s.getLocation().getLocationCode().equals(locationCode))
                .collect(Collectors.toList());
        if (assetCode == null || assetCode.equals("")) {
            return firstList;
        }
        List<AssetDto> theChosenList = firstList.stream().filter(s -> s.getAssetCode().equals(assetCode))
                .collect(Collectors.toList());
        if (theChosenList.size() != 0) {
            AssetDto newestChanged = theChosenList.get(0);
            List<AssetDto> result = firstList.stream().filter(s -> !s.getAssetCode().equals(assetCode))
                    .collect(Collectors.toList());
            result.add(0, newestChanged);
            return result;
        }
        return firstList;
    }

    @Override
    public AssetDto creatAsset(AssetDto assetDto) {
        Asset asset = this.assetRepo.save(AssetMapper.toEntity(assetDto));
        Category found = this.categoryRepo.findById(assetDto.getCategory().getCategoryCode()).orElse(null);
        assetDto.getCategory().setMaxAssetCode(found.getMaxAssetCode()+1);
        found.setMaxAssetCode(found.getMaxAssetCode()+1);
        this.categoryRepo.save(found);
        return AssetMapper.toDto(asset);
    }

    @Override
    public AssetDto updateAsset(AssetDto assetDetails) {
        Asset found = this.assetRepo.findById(assetDetails.getAssetCode()).orElse(null);
        found.setAssetName(assetDetails.getAssetName());
        found.setSpecification(assetDetails.getSpecification());
        found.setInstalledDate(assetDetails.getInstalledDate());
        found.setState(AssetStateMapper.toInt(assetDetails.getState()));
        this.assetRepo.save(found);
        return AssetMapper.toDto(found);
    }
    /**
     * Delete asset have assetCode
     * @param code asset's assetCode
     * @see #deleteByAssetCode(String)
     * @return {@link String}
     */
    @Override
    public String deleteByAssetCode(String code) {
        Asset found = this.assetRepo.findById(code).orElse(null);
        if (found == null) {
            return "Cant find asset with given code";
        }else{
            if(found.getState() != 3){
                assetRepo.delete(found);
                return "Delete success";
            }
            else {
                return "Cant delete asset have this state";
            }
        }

    }
//    }

    @Override
    public List<ReportPOJO> getReport() {
        List<ReportPOJO> result = new ArrayList<>();
        List<String> categoryName = this.assetRepo.getCategoryList();
        categoryName.forEach(e -> {
            result.add(
                    new ReportPOJO(
                            e,
                            this.assetRepo.getTotal(e),
                            this.assetRepo.getAssetWithState(3, e),
                            this.assetRepo.getAssetWithState(0, e),
                            this.assetRepo.getAssetWithState(1, e),
                            this.assetRepo.getAssetWithState(2, e),
                            this.assetRepo.getAssetWithState(4, e))
            );
        });
        return result;
    }
}
