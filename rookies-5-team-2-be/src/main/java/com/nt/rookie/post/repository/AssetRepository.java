package com.nt.rookie.post.repository;

import com.nt.rookie.post.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nt.rookie.post.model.Asset;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssetRepository extends JpaRepository<Asset, String> {
    /**
     * Return number of assets in database found by given category name
     * @param categoryName category name
     * @return {@link Integer}
     */
    @Query(value = "select count(a.asset_code) from asset a join category ca on a.category_code = ca.category_code where ca.name = :categoryName", nativeQuery = true)
    int getTotal(String categoryName);
    /**
     * Return list of all category
     * @return {@link List<String>}
     */
    @Query(value = "select ca.name from category ca where 1", nativeQuery = true)
    List<String> getCategoryList();

    /**
     * Return number of asset found by given state number and category name
     * @param stateNum asset's state
     * @param categoryName category name
     * @return {@link Integer}
     */
    @Query(value = "select count(a.asset_code) from asset a join category ca on a.category_code = ca.category_code where a.state = :stateNum and ca.name = :categoryName", nativeQuery = true)
    int getAssetWithState(int stateNum, String categoryName);

//    @Query(value = "select asset from Asset asset where asset.asset_code = :asset_code",  nativeQuery = true)
//    Asset getAssetByCode(String asset_code);
}

