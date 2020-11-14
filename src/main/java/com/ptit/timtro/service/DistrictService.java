package com.ptit.timtro.service;

import com.ptit.timtro.model.District;

import java.util.List;

public interface DistrictService {
    List<District> getAll();

    District getById(Integer id);
}
