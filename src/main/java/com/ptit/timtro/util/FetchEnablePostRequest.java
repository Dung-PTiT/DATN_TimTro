package com.ptit.timtro.util;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FetchEnablePostRequest {
    private String provinceId;
    private String districtId;
    private String wardId;
    private String minPrice;
    private String maxPrice;
    private String minAcreage;
    private String maxAcreage;
    private String categoryId;

    public FetchEnablePostRequest() {
    }

    public FetchEnablePostRequest(String provinceId, String districtId, String wardId, String minPrice, String maxPrice, String minAcreage, String maxAcreage, String categoryId) {
        this.provinceId = provinceId;
        this.districtId = districtId;
        this.wardId = wardId;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.minAcreage = minAcreage;
        this.maxAcreage = maxAcreage;
        this.categoryId = categoryId;
    }
}
