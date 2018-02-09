package com.atom.coco.repository;

import com.atom.coco.domain.ScPostsMentions;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ScPostsMentions entity.
 */
@SuppressWarnings("unused")
public interface ScPostsMentionsRepository extends JpaRepository<ScPostsMentions,Long> {

    @Query("select scPostsMentions from ScPostsMentions scPostsMentions where scPostsMentions.user.login = ?#{principal.username}")
    List<ScPostsMentions> findByUserIsCurrentUser();

}
