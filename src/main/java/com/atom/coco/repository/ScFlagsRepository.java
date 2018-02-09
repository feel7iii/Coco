package com.atom.coco.repository;

import com.atom.coco.domain.ScFlags;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ScFlags entity.
 */
@SuppressWarnings("unused")
public interface ScFlagsRepository extends JpaRepository<ScFlags,Long> {

    @Query("select scFlags from ScFlags scFlags where scFlags.user.login = ?#{principal.username}")
    List<ScFlags> findByUserIsCurrentUser();

}
