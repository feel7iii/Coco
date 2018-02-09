package com.atom.coco.repository;

import com.atom.coco.domain.ScTags;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ScTags entity.
 */
@SuppressWarnings("unused")
public interface ScTagsRepository extends JpaRepository<ScTags,Long> {

    @Query("select scTags from ScTags scTags where scTags.user.login = ?#{principal.username}")
    List<ScTags> findByUserIsCurrentUser();

}
