package com.ptit.timtro.security;

import com.ptit.timtro.dao.UserDAO;
import com.ptit.timtro.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service(value = "SecutiryUserDetailsService")
@Transactional(readOnly = true)
public class SecurityUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDAO userDAO;

    public SecurityUserDetailsService() {
    }

    @Override
    public UserPrincipal loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userDAO.getByUsername(username);
        if (userEntity != null) {
            return UserPrincipal.createInstance(userEntity);
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }

    public UserPrincipal loadUserByEmail(String email) {
        UserEntity userEntity = userDAO.getByEmail(email);
        if (userEntity != null) {
            return UserPrincipal.createInstance(userEntity);
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }

    public UserPrincipal loadUserById(Integer id) {
        UserEntity userEntity = userDAO.get(id);
        if (userEntity != null) {
            return UserPrincipal.createInstance(userEntity);
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }
}
