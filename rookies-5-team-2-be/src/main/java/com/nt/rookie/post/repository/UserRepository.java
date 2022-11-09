package com.nt.rookie.post.repository;

import com.nt.rookie.post.model.SystemUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<SystemUser, String> {
    /**
     * Return number of user with the same username as given username
     * @param mockUsername username to check
     * @return {@link Integer}
     */
    @Query(value = "select count(u.username) from user u  where u.username like :mockUsername%", nativeQuery = true)
    int getDuplicateUsername(String mockUsername);
}
