package com.ptit.timtro.controller;

import com.ptit.timtro.model.District;
import com.ptit.timtro.model.Province;
import com.ptit.timtro.service.DistrictService;
import com.ptit.timtro.service.ProvinceService;
import com.ptit.timtro.util.DataResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AddressController {

    @Autowired
    private ProvinceService provinceService;

    @Autowired
    private DistrictService districtService;

    @GetMapping("/address/province/get-all")
    public DataResponse<List<Province>> getAllProvinces() {
        try {
            return new DataResponse<>(true, provinceService.getAll());
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }
    }

    @GetMapping("/address/province/get-by-id")
    public DataResponse<Province> getProvinceById(@RequestParam("id") Integer id) {
        try {
            return new DataResponse<>(true, provinceService.getById(id));
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }
    }

    @GetMapping("/address/district/get-all")
    public DataResponse<List<District>> getAllDistricts() {
        try {
            return new DataResponse<>(true, districtService.getAll());
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }
    }

    @GetMapping("/address/district/get-by-id")
    public DataResponse<District> getDistrictById(@RequestParam("id") Integer id) {
        try {
            return new DataResponse<>(true, districtService.getById(id));
        } catch (Exception e) {
            e.printStackTrace();
            return new DataResponse<>(false, null);
        }

    }
}


