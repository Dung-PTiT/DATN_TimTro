package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.TagDAO;
import com.ptit.timtro.entity.TagEntity;
import com.ptit.timtro.model.Tag;
import com.ptit.timtro.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TagServiceImpl implements TagService {

    @Autowired
    private TagDAO tagDAO;

    @Override
    public List<Tag> getAll() {
        List<TagEntity> tagEntities = tagDAO.getAll();
        if (tagEntities != null) {
            return tagEntities.stream().map(element ->
                    new Tag(element.getId(), element.getName(), element.getDescription(), null))
                    .collect(Collectors.toList());
        }
        return null;
    }
}
