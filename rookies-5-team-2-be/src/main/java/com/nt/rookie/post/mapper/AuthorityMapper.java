package com.nt.rookie.post.mapper;

import com.nt.rookie.post.dto.AuthorityDto;
import com.nt.rookie.post.model.Authority;

public class AuthorityMapper {
    public static AuthorityDto toDto(Authority authority) {
        AuthorityDto result = new AuthorityDto();
        result.setAuthority(authority.getAuthority());
        result.setId(authority.getId());
        return result;
    }

    public static Authority toEntity(AuthorityDto authority) {
        Authority result = new Authority();
        result.setAuthority(authority.getAuthority());
        result.setId(authority.getId());
        return result;
    }
}
