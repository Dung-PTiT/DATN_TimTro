package com.ptit.timtro.service.impl;

import com.ptit.timtro.dao.PostVipDAO;
import com.ptit.timtro.entity.PostEntity;
import com.ptit.timtro.entity.PostVipEntity;
import com.ptit.timtro.model.PostVip;
import com.ptit.timtro.service.PostVipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PostVipServiceImpl implements PostVipService {

    @Autowired
    private PostVipDAO postVipDAO;

    @Override
    public void update(PostVip postVip) {
        PostVipEntity postVipEntity = postVipDAO.getById(postVip.getId());
        postVipEntity.setName(postVip.getName());
        postVipEntity.setDescription(postVip.getDescription());
        postVipEntity.setDayPrice(postVip.getDayPrice());
        postVipEntity.setWeekPrice(postVip.getWeekPrice());
        postVipEntity.setMonthPrice(postVip.getMonthPrice());
        postVipDAO.update(postVipEntity);
    }

    @Override
    public PostVip getById(Integer id) {
        PostVipEntity postVipEntity = postVipDAO.getById(id);
        PostVip postVip = new PostVip();
        postVip.setId(postVipEntity.getId());
        postVip.setName(postVipEntity.getName());
        postVip.setVipLevel(postVipEntity.getViplevel());
        postVip.setDescription(postVipEntity.getDescription());
        postVip.setDayPrice(postVipEntity.getDayPrice());
        postVip.setWeekPrice(postVipEntity.getWeekPrice());
        postVip.setMonthPrice(postVipEntity.getMonthPrice());
        return postVip;
    }

    @Override
    public List<PostVip> getAll() {
        List<PostVipEntity> postVipEntities = postVipDAO.getAll();
        if (postVipEntities != null) {
            return postVipEntities.stream().map(
                    postVipEntity -> {
                        PostVip postVip = new PostVip();
                        postVip.setId(postVipEntity.getId());
                        postVip.setName(postVipEntity.getName());
                        postVip.setVipLevel(postVipEntity.getViplevel());
                        postVip.setDescription(postVipEntity.getDescription());
                        postVip.setDayPrice(postVipEntity.getDayPrice());
                        postVip.setWeekPrice(postVipEntity.getWeekPrice());
                        postVip.setMonthPrice(postVipEntity.getMonthPrice());
                        return postVip;
                    }
            ).collect(Collectors.toList());
        }
        return null;
    }
}
