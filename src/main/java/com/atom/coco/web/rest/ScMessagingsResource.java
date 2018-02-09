package com.atom.coco.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.atom.coco.domain.ScMessagings;

import com.atom.coco.repository.ScMessagingsRepository;
import com.atom.coco.repository.search.ScMessagingsSearchRepository;
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
 * REST controller for managing ScMessagings.
 */
@RestController
@RequestMapping("/api")
public class ScMessagingsResource {

    private final Logger log = LoggerFactory.getLogger(ScMessagingsResource.class);

    private static final String ENTITY_NAME = "scMessagings";
        
    private final ScMessagingsRepository scMessagingsRepository;

    private final ScMessagingsSearchRepository scMessagingsSearchRepository;

    public ScMessagingsResource(ScMessagingsRepository scMessagingsRepository, ScMessagingsSearchRepository scMessagingsSearchRepository) {
        this.scMessagingsRepository = scMessagingsRepository;
        this.scMessagingsSearchRepository = scMessagingsSearchRepository;
    }

    /**
     * POST  /sc-messagings : Create a new scMessagings.
     *
     * @param scMessagings the scMessagings to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scMessagings, or with status 400 (Bad Request) if the scMessagings has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sc-messagings")
    @Timed
    public ResponseEntity<ScMessagings> createScMessagings(@RequestBody ScMessagings scMessagings) throws URISyntaxException {
        log.debug("REST request to save ScMessagings : {}", scMessagings);
        if (scMessagings.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new scMessagings cannot already have an ID")).body(null);
        }
        ScMessagings result = scMessagingsRepository.save(scMessagings);
        scMessagingsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/sc-messagings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sc-messagings : Updates an existing scMessagings.
     *
     * @param scMessagings the scMessagings to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scMessagings,
     * or with status 400 (Bad Request) if the scMessagings is not valid,
     * or with status 500 (Internal Server Error) if the scMessagings couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sc-messagings")
    @Timed
    public ResponseEntity<ScMessagings> updateScMessagings(@RequestBody ScMessagings scMessagings) throws URISyntaxException {
        log.debug("REST request to update ScMessagings : {}", scMessagings);
        if (scMessagings.getId() == null) {
            return createScMessagings(scMessagings);
        }
        ScMessagings result = scMessagingsRepository.save(scMessagings);
        scMessagingsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scMessagings.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sc-messagings : get all the scMessagings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of scMessagings in body
     */
    @GetMapping("/sc-messagings")
    @Timed
    public List<ScMessagings> getAllScMessagings() {
        log.debug("REST request to get all ScMessagings");
        List<ScMessagings> scMessagings = scMessagingsRepository.findAll();
        return scMessagings;
    }

    /**
     * GET  /sc-messagings/:id : get the "id" scMessagings.
     *
     * @param id the id of the scMessagings to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scMessagings, or with status 404 (Not Found)
     */
    @GetMapping("/sc-messagings/{id}")
    @Timed
    public ResponseEntity<ScMessagings> getScMessagings(@PathVariable Long id) {
        log.debug("REST request to get ScMessagings : {}", id);
        ScMessagings scMessagings = scMessagingsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(scMessagings));
    }

    /**
     * DELETE  /sc-messagings/:id : delete the "id" scMessagings.
     *
     * @param id the id of the scMessagings to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sc-messagings/{id}")
    @Timed
    public ResponseEntity<Void> deleteScMessagings(@PathVariable Long id) {
        log.debug("REST request to delete ScMessagings : {}", id);
        scMessagingsRepository.delete(id);
        scMessagingsSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/sc-messagings?query=:query : search for the scMessagings corresponding
     * to the query.
     *
     * @param query the query of the scMessagings search 
     * @return the result of the search
     */
    @GetMapping("/_search/sc-messagings")
    @Timed
    public List<ScMessagings> searchScMessagings(@RequestParam String query) {
        log.debug("REST request to search ScMessagings for query {}", query);
        return StreamSupport
            .stream(scMessagingsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }


}
