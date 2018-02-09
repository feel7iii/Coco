package com.atom.coco.repository;

import com.atom.coco.domain.ScGroups;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the ScGroups entity.
 */
@SuppressWarnings("unused")
public interface ScGroupsRepository extends JpaRepository<ScGroups,Long> {

    @Query("select distinct scGroups from ScGroups scGroups left join fetch scGroups.users")
    List<ScGroups> findAllWithEagerRelationships();

    @Query("select scGroups from ScGroups scGroups left join fetch scGroups.users where scGroups.id =:id")
    ScGroups findOneWithEagerRelationships(@Param("id") Long id);

}
