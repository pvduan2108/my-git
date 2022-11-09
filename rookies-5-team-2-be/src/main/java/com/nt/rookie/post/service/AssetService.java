package com.nt.rookie.post.service;

import com.nt.rookie.post.dto.AssetDto;
import com.nt.rookie.post.dto.ReportPOJO;
import com.nt.rookie.post.model.Asset;
import java.util.List;

public interface AssetService {
    List<AssetDto> findAll();

    AssetDto findByAssetCode(String code);

    Asset findWithAssetCode(String code);

    List<AssetDto> viewAsset(String locationCode, String assetCode);

    List<AssetDto> viewAssetDefault(String locationCode, String assetCode);

    AssetDto creatAsset(AssetDto assetDto);
    String deleteByAssetCode(String code);

    AssetDto updateAsset(AssetDto assetDetails);

    List<ReportPOJO> getReport();
}
