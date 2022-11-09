package com.nt.rookie.post.controller.entityController;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.nt.rookie.post.dto.AssetDto;
import com.nt.rookie.post.service.impl.AssetServiceImpl;
import com.nt.rookie.post.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.mockito.quality.Strictness.LENIENT;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = LENIENT)
public class AssetControllerTest {
    @Mock
    private AssetServiceImpl assetService;

    @InjectMocks
    private AssetController assetController;

    @Test
    public void getAllByLocation() throws Exception {
        ObjectNode object = new ObjectNode(JsonNodeFactory.instance);
        String locationCode = "";
        String assetCode = "";
        object.put("locationCode", locationCode);
        object.put("assetCode",assetCode);
        given(assetService.viewAsset(Mockito.anyString(), Mockito.anyString())).willReturn(null);
        assertEquals(404,assetController.viewAsset(object).getStatusCode().value());
    }
    @Test
    public void getAllByLocation1() throws Exception {
        ObjectNode object = new ObjectNode(JsonNodeFactory.instance);
        String locationCode = "";
        String assetCode = "";
        object.put("locationCode", locationCode);
        object.put("assetCode",assetCode);
        given(assetService.viewAsset(Mockito.anyString(), Mockito.anyString())).willReturn(new ArrayList<>());
        assertEquals(200,assetController.viewAsset(object).getStatusCode().value());
    }

    @Test
    void getAssetByAssetCode1() {
        String assetCode = "";
        given(assetService.findByAssetCode(assetCode)).willReturn(new AssetDto());
        assertEquals(200,assetController.getByAssetCode(assetCode).getStatusCodeValue());
    }
    @Test
    void deleteAssetByAssetCode() {
        String assetCode = "";
        given(assetService.deleteByAssetCode(assetCode)).willReturn(new String());
        assertEquals(200,assetController.deleteByAssetCode(assetCode).getStatusCodeValue());
    }
}
