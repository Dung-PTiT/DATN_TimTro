package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.DistrictDAO;
import com.ptit.timtro.entity.DistrictEntity;
import com.ptit.timtro.model.District;
import com.ptit.timtro.model.Ward;
import com.ptit.timtro.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class DistrictServiceImpl implements DistrictService {

    @Autowired
    private DistrictDAO districtDAO;

    @Override
    public List<District> getAll() {
        List<DistrictEntity> districtEntities = districtDAO.getAll();
        if (districtEntities != null) {
            return districtEntities.stream().map(element ->
                    new District(element.getId(), element.getName(), element.getPrefix(), null))
                    .collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public District getById(Integer id) {
        DistrictEntity districtEntity = districtDAO.getById(id);
        return new District(
                districtEntity.getId(),
                districtEntity.getName(),
                districtEntity.getPrefix(),
                districtEntity
                        .getWards()
                        .stream()
                        .map(element -> new Ward(element.getId(), element.getName(), element.getPrefix()))
                        .collect(Collectors.toList())
        );
    }
}
