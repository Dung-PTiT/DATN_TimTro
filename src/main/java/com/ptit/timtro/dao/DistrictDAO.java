package com.ptit.timtro.dao;

import com.ptit.timtro.entity.DistrictEntity;

import java.util.List;

public interface DistrictDAO {
    List<DistrictEntity> getAll();

    DistrictEntity getById(Integer id);
}
