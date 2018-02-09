package com.atom.coco.repository;

import com.atom.coco.domain.ScMessagings;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ScMessagings entity.
 */
@SuppressWarnings("unused")
public interface ScMessagingsRepository extends JpaRepository<ScMessagings,Long> {

    @Query("select scMessagings from ScMessagings scMessagings where scMessagings.user.login = ?#{principal.username}")
    List<ScMessagings> findByUserIsCurrentUser();

}
