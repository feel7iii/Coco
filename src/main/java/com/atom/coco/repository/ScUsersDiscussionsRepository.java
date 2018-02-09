package com.atom.coco.repository;

import com.atom.coco.domain.ScUsersDiscussions;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ScUsersDiscussions entity.
 */
@SuppressWarnings("unused")
public interface ScUsersDiscussionsRepository extends JpaRepository<ScUsersDiscussions,Long> {

    @Query("select scUsersDiscussions from ScUsersDiscussions scUsersDiscussions where scUsersDiscussions.user.login = ?#{principal.username}")
    List<ScUsersDiscussions> findByUserIsCurrentUser();

}
