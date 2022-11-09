package com.nt.rookie.post.mapper;

import com.nt.rookie.post.dto.AssetDto;
import com.nt.rookie.post.model.Asset;

import java.util.List;
import java.util.stream.Collectors;

public class AssetMapper {
    public static AssetDto toDto(Asset asset) {
        AssetDto result = new AssetDto();
        result.setAssetCode(asset.getAssetCode());
        result.setAssetName(asset.getAssetName());
        result.setCategory(CategoryMapper.toDto(asset.getCategory()));
        result.setState(AssetStateMapper.toString(asset.getState()));
        result.setSpecification(asset.getSpecification());
        result.setInstalledDate(asset.getInstalledDate());
        result.setLocation(LocationMapper.toDto(asset.getLocation()));
        return result;
    }

    public static Asset toEntity(AssetDto asset) {
        Asset result = new Asset();

        result.setAssetName(asset.getAssetName());
        result.setCategory(CategoryMapper.toEntity(asset.getCategory()));
        result.setState(AssetStateMapper.toInt(asset.getState()));
        result.setSpecification(asset.getSpecification());
        result.setInstalledDate(asset.getInstalledDate());
        result.setLocation(LocationMapper.toEntity(asset.getLocation()));
        return result;
    }

    public static List<AssetDto> toDtoList(List<Asset> entities) {
        return entities.stream().map(AssetMapper::toDto).collect(Collectors.toList());
    }

    public static List<Asset> toEntityList(List<AssetDto> entities) {
        return entities.stream().map(AssetMapper::toEntity).collect(Collectors.toList());
    }
}
