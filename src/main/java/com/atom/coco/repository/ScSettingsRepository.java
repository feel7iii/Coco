package com.atom.coco.repository;

import com.atom.coco.domain.ScSettings;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ScSettings entity.
 */
@SuppressWarnings("unused")
public interface ScSettingsRepository extends JpaRepository<ScSettings,Long> {

    @Query("select scSettings from ScSettings scSettings where scSettings.user.login = ?#{principal.username}")
    List<ScSettings> findByUserIsCurrentUser();

}
