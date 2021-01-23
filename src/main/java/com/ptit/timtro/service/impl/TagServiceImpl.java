package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.TagDAO;
import com.ptit.timtro.entity.PostEntity;
import com.ptit.timtro.entity.TagEntity;
import com.ptit.timtro.model.Post;
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
    public void create(Tag tag) {
        TagEntity tagEntity = new TagEntity();
        tagEntity.setName(tag.getName());
        tagEntity.setDescription(tag.getDescription());
        tagDAO.create(tagEntity);
    }

    @Override
    public void update(Tag tag) {
        TagEntity tagEntity = tagDAO.getById(tag.getId());
        tagEntity.setName(tag.getName());
        tagEntity.setDescription(tag.getDescription());
        tagDAO.update(tagEntity);
    }

    @Override
    public void delete(Integer id) {
        tagDAO.delete(id);
    }

    @Override
    public Tag getById(Integer id) {
        TagEntity tagEntity = tagDAO.getById(id);
        Tag tag = new Tag();
        tag.setId(tagEntity.getId());
        tag.setName(tagEntity.getName());
        tag.setDescription(tagEntity.getDescription());
        return tag;
    }

    @Override
    public List<Tag> getAll() {
        List<TagEntity> tagEntities = tagDAO.getAll();
        if (tagEntities != null) {
            return tagEntities.stream().map(element ->
                    new Tag(element.getId(), element.getName(), element.getDescription()))
                    .collect(Collectors.toList());
        }
        return null;
    }
}
