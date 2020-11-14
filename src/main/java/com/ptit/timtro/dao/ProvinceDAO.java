package com.ptit.timtro.dao;

import com.ptit.timtro.entity.ProvinceEntity;

import java.util.List;

public interface ProvinceDAO {
    List<ProvinceEntity> getAll();

    ProvinceEntity getById(Integer id);
}
