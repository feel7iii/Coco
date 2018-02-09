package com.atom.coco.repository;

import com.atom.coco.domain.ScPosts;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ScPosts entity.
 */
@SuppressWarnings("unused")
public interface ScPostsRepository extends JpaRepository<ScPosts,Long> {

    @Query("select scPosts from ScPosts scPosts where scPosts.user.login = ?#{principal.username}")
    List<ScPosts> findByUserIsCurrentUser();

}
