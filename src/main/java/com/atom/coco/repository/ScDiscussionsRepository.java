package com.atom.coco.repository;

import com.atom.coco.domain.ScDiscussions;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the ScDiscussions entity.
 */
@SuppressWarnings("unused")
public interface ScDiscussionsRepository extends JpaRepository<ScDiscussions,Long> {

    @Query("select distinct scDiscussions from ScDiscussions scDiscussions left join fetch scDiscussions.scTags")
    List<ScDiscussions> findAllWithEagerRelationships();

    @Query("select scDiscussions from ScDiscussions scDiscussions left join fetch scDiscussions.scTags where scDiscussions.id =:id")
    ScDiscussions findOneWithEagerRelationships(@Param("id") Long id);

}
