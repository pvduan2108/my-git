package com.nt.rookie.post.service.impl;

import com.nt.rookie.post.model.SystemUser;
import com.nt.rookie.post.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;
    private static final String USER_DEFAULT = "refresher";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SystemUser user = findUserByUsername(username);
        UserBuilder builder = null;
        if (user != null) {
            builder = User.withUsername(username);
            builder.password(user.getPassword());
            builder.authorities(user.getAuthority().getAuthority());
            return builder.build();
        } else {
            throw new UsernameNotFoundException("User not found with name: " + username);
        }
    }

    public SystemUser findUserByUsername(String username) {
        if (username != null) {
            SystemUser user = userService.findWithUsername(username);
            return user;
        }
        return null;
    }
}
