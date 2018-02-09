package com.atom.coco.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.atom.coco.domain.ScSettings;

import com.atom.coco.repository.ScSettingsRepository;
import com.atom.coco.repository.search.ScSettingsSearchRepository;
import com.atom.coco.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing ScSettings.
 */
@RestController
@RequestMapping("/api")
public class ScSettingsResource {

    private final Logger log = LoggerFactory.getLogger(ScSettingsResource.class);

    private static final String ENTITY_NAME = "scSettings";
        
    private final ScSettingsRepository scSettingsRepository;

    private final ScSettingsSearchRepository scSettingsSearchRepository;

    public ScSettingsResource(ScSettingsRepository scSettingsRepository, ScSettingsSearchRepository scSettingsSearchRepository) {
        this.scSettingsRepository = scSettingsRepository;
        this.scSettingsSearchRepository = scSettingsSearchRepository;
    }

    /**
     * POST  /sc-settings : Create a new scSettings.
     *
     * @param scSettings the scSettings to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scSettings, or with status 400 (Bad Request) if the scSettings has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sc-settings")
    @Timed
    public ResponseEntity<ScSettings> createScSettings(@RequestBody ScSettings scSettings) throws URISyntaxException {
        log.debug("REST request to save ScSettings : {}", scSettings);
        if (scSettings.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new scSettings cannot already have an ID")).body(null);
        }
        ScSettings result = scSettingsRepository.save(scSettings);
        scSettingsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/sc-settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sc-settings : Updates an existing scSettings.
     *
     * @param scSettings the scSettings to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scSettings,
     * or with status 400 (Bad Request) if the scSettings is not valid,
     * or with status 500 (Internal Server Error) if the scSettings couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sc-settings")
    @Timed
    public ResponseEntity<ScSettings> updateScSettings(@RequestBody ScSettings scSettings) throws URISyntaxException {
        log.debug("REST request to update ScSettings : {}", scSettings);
        if (scSettings.getId() == null) {
            return createScSettings(scSettings);
        }
        ScSettings result = scSettingsRepository.save(scSettings);
        scSettingsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scSettings.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sc-settings : get all the scSettings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of scSettings in body
     */
    @GetMapping("/sc-settings")
    @Timed
    public List<ScSettings> getAllScSettings() {
        log.debug("REST request to get all ScSettings");
        List<ScSettings> scSettings = scSettingsRepository.findAll();
        return scSettings;
    }

    /**
     * GET  /sc-settings/:id : get the "id" scSettings.
     *
     * @param id the id of the scSettings to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scSettings, or with status 404 (Not Found)
     */
    @GetMapping("/sc-settings/{id}")
    @Timed
    public ResponseEntity<ScSettings> getScSettings(@PathVariable Long id) {
        log.debug("REST request to get ScSettings : {}", id);
        ScSettings scSettings = scSettingsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(scSettings));
    }

    /**
     * DELETE  /sc-settings/:id : delete the "id" scSettings.
     *
     * @param id the id of the scSettings to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sc-settings/{id}")
    @Timed
    public ResponseEntity<Void> deleteScSettings(@PathVariable Long id) {
        log.debug("REST request to delete ScSettings : {}", id);
        scSettingsRepository.delete(id);
        scSettingsSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/sc-settings?query=:query : search for the scSettings corresponding
     * to the query.
     *
     * @param query the query of the scSettings search 
     * @return the result of the search
     */
    @GetMapping("/_search/sc-settings")
    @Timed
    public List<ScSettings> searchScSettings(@RequestParam String query) {
        log.debug("REST request to search ScSettings for query {}", query);
        return StreamSupport
            .stream(scSettingsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }


}
