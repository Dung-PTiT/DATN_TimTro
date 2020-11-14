package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.ProvinceDAO;
import com.ptit.timtro.entity.ProvinceEntity;
import com.ptit.timtro.model.District;
import com.ptit.timtro.model.Province;
import com.ptit.timtro.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProvinceServiceImpl implements ProvinceService {

    @Autowired
    private ProvinceDAO provinceDAO;

    @Override
    public List<Province> getAll() {
        List<ProvinceEntity> provinceEntities = provinceDAO.getAll();
        if (provinceEntities != null) {
            return provinceEntities.stream().map(element ->
                    new Province(element.getId(), element.getName(), element.getCode(), null))
                    .collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public Province getById(Integer id) {
        ProvinceEntity provinceEntity = provinceDAO.getById(id);
        return new Province(
                provinceEntity.getId(),
                provinceEntity.getName(),
                provinceEntity.getCode(),
                provinceEntity
                        .getDistricts()
                        .stream()
                        .map(element -> new District(element.getId(), element.getName(), element.getPrefix(), null))
                        .collect(Collectors.toList())
        );
    }
}
