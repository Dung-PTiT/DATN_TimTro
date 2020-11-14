package com.ptit.timtro.service;

import com.ptit.timtro.model.Province;

import java.util.List;

public interface ProvinceService {
    List<Province> getAll();

    Province getById(Integer id);
}
