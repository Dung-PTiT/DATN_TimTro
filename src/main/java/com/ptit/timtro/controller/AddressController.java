package com.ptit.timtro.controller;

import com.ptit.timtro.model.District;
import com.ptit.timtro.model.Province;
import com.ptit.timtro.service.DistrictService;
import com.ptit.timtro.service.ProvinceService;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AddressController {

    @Autowired
    private ProvinceService provinceService;

    @Autowired
    private DistrictService districtService;

    @GetMapping("/address/province/get-all")
    public DataResponse<List<Province>> getAllProvinces() {
        return new DataResponse<>(true, provinceService.getAll());
    }

    @PostMapping("/address/province/get-by-id")
    public DataResponse<Province> getProvinceById(@RequestParam("id") Integer id) {
        return new DataResponse<>(true, provinceService.getById(id));
    }

    @GetMapping("/address/district/get-all")
    public DataResponse<List<District>> getAllDistricts() {
        return new DataResponse<>(true, districtService.getAll());
    }

    @PostMapping("/address/district/get-by-id")
    public DataResponse<District> getDistrictById(@RequestParam("id") Integer id) {
        return new DataResponse<>(true, districtService.getById(id));
    }
}


