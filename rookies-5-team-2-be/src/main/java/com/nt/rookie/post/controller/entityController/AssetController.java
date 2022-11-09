package com.nt.rookie.post.controller.entityController;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.nt.rookie.post.dto.AssetDto;
import com.nt.rookie.post.dto.AssignmentDto;
import com.nt.rookie.post.mapper.AssetStateMapper;
import com.nt.rookie.post.model.Asset;
import com.nt.rookie.post.model.Category;
import com.nt.rookie.post.service.AssetService;
import com.nt.rookie.post.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.nt.rookie.post.dto.ReportPOJO;
import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

@Validated
@CrossOrigin
@RestController
@RequestMapping("/asset")
public class AssetController {
    @Autowired
    private AssetService assetService;
    @Autowired
    private CategoryService cateService;

    public AssetController(AssetService assetService) {
        this.assetService = Objects.requireNonNull(assetService);
    }
    /**
     * Return response with list of all asset
     * @return {@link ResponseEntity<List>}
     */
    @GetMapping("/")
    public ResponseEntity<List<AssetDto>> getAll() {
        return new ResponseEntity<>(assetService.findAll(), HttpStatus.OK);
    }
    
    @PutMapping("/{assetCode}")
    public ResponseEntity<AssetDto> updateAsset (@PathVariable String assetCode, @Valid @RequestBody AssetDto assetDetails) {

        Asset asset = this.assetService.findWithAssetCode(assetCode);
        if(asset == null) {
            return new ResponseEntity<>(assetDetails,HttpStatus.BAD_REQUEST);
        } else {
            if(asset.getState()==3|| asset.getState()==-1) {
                return new ResponseEntity<>(assetDetails, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(assetService.updateAsset(assetDetails), HttpStatus.OK);
        }
    }
    
    @PostMapping("/create")
    public ResponseEntity<AssetDto> createdAsset(@RequestBody @Valid AssetDto assetDto) {
        Category category = this.cateService.findById(assetDto.getCategory().getCategoryCode());
        if(category==null){
            new ResponseEntity<>(assetDto, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(assetService.creatAsset(assetDto), HttpStatus.CREATED);
    }

    @GetMapping("/{asset-code}")
    public ResponseEntity<AssetDto> getByAssetCode(@PathVariable("asset-code") String parameter) {
        return new ResponseEntity<>(assetService.findByAssetCode(parameter), HttpStatus.OK);
    }
    /**
     * Return response contain list of asset with given locationCode and have state like Available, Not Available, Assigned
     * Asset has same assetCode as given assetCode is on top of list
     * @param objectNode contain locationCode and assetCode
     * @return {@link ResponseEntity<List>}
     */
    @PostMapping("/view")
    public ResponseEntity<List<AssetDto>> viewAsset(@RequestBody ObjectNode objectNode) {
        String locationCode = objectNode.get("locationCode").asText();
        String assetCode = objectNode.get("assetCode").asText();
        if (assetService.viewAsset(locationCode, assetCode) == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            List<AssetDto> dtoList = assetService.viewAsset(locationCode, assetCode);
            return new ResponseEntity<>(dtoList, HttpStatus.OK);
        }
    }
    /**
     * Return response contain list of asset with given locationCode.
     * Asset has same assetCode as given assetCode is on top of list
     * @param objectNode contain locationCode and assetCode
     * @return {@link ResponseEntity<List>}
     */
    @PostMapping("/viewdefault")
    public ResponseEntity<List<AssetDto>> viewAssetDefault(@RequestBody ObjectNode objectNode) {
        String locationCode = objectNode.get("locationCode").asText();
        String assetCode = objectNode.get("assetCode").asText();
        System.out.println(objectNode + " is object node");
        if (assetService.viewAssetDefault(locationCode, assetCode) == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            List<AssetDto> dtoList = assetService.viewAssetDefault(locationCode, assetCode);
            return new ResponseEntity<>(dtoList, HttpStatus.OK);
        }
    }

    /**
     * Delete asset have assetCode as same as given assetCode
     * @param parameter contain assetCode
     * @return {@link ResponseEntity<String>}
     */
    @DeleteMapping("/{asset-code}")
    public ResponseEntity<String> deleteByAssetCode(@PathVariable("asset-code") String parameter) {
        return new ResponseEntity<>(assetService.deleteByAssetCode(parameter), HttpStatus.OK);
    }



    @GetMapping("/report")
    public ResponseEntity<List<ReportPOJO>> getReport() {
        return new ResponseEntity<>(assetService.getReport(), HttpStatus.OK);
    }

}
