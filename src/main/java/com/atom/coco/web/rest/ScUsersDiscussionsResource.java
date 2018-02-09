package com.atom.coco.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.atom.coco.domain.ScUsersDiscussions;

import com.atom.coco.repository.ScUsersDiscussionsRepository;
import com.atom.coco.repository.search.ScUsersDiscussionsSearchRepository;
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
 * REST controller for managing ScUsersDiscussions.
 */
@RestController
@RequestMapping("/api")
public class ScUsersDiscussionsResource {

    private final Logger log = LoggerFactory.getLogger(ScUsersDiscussionsResource.class);

    private static final String ENTITY_NAME = "scUsersDiscussions";
        
    private final ScUsersDiscussionsRepository scUsersDiscussionsRepository;

    private final ScUsersDiscussionsSearchRepository scUsersDiscussionsSearchRepository;

    public ScUsersDiscussionsResource(ScUsersDiscussionsRepository scUsersDiscussionsRepository, ScUsersDiscussionsSearchRepository scUsersDiscussionsSearchRepository) {
        this.scUsersDiscussionsRepository = scUsersDiscussionsRepository;
        this.scUsersDiscussionsSearchRepository = scUsersDiscussionsSearchRepository;
    }

    /**
     * POST  /sc-users-discussions : Create a new scUsersDiscussions.
     *
     * @param scUsersDiscussions the scUsersDiscussions to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scUsersDiscussions, or with status 400 (Bad Request) if the scUsersDiscussions has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sc-users-discussions")
    @Timed
    public ResponseEntity<ScUsersDiscussions> createScUsersDiscussions(@RequestBody ScUsersDiscussions scUsersDiscussions) throws URISyntaxException {
        log.debug("REST request to save ScUsersDiscussions : {}", scUsersDiscussions);
        if (scUsersDiscussions.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new scUsersDiscussions cannot already have an ID")).body(null);
        }
        ScUsersDiscussions result = scUsersDiscussionsRepository.save(scUsersDiscussions);
        scUsersDiscussionsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/sc-users-discussions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sc-users-discussions : Updates an existing scUsersDiscussions.
     *
     * @param scUsersDiscussions the scUsersDiscussions to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scUsersDiscussions,
     * or with status 400 (Bad Request) if the scUsersDiscussions is not valid,
     * or with status 500 (Internal Server Error) if the scUsersDiscussions couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sc-users-discussions")
    @Timed
    public ResponseEntity<ScUsersDiscussions> updateScUsersDiscussions(@RequestBody ScUsersDiscussions scUsersDiscussions) throws URISyntaxException {
        log.debug("REST request to update ScUsersDiscussions : {}", scUsersDiscussions);
        if (scUsersDiscussions.getId() == null) {
            return createScUsersDiscussions(scUsersDiscussions);
        }
        ScUsersDiscussions result = scUsersDiscussionsRepository.save(scUsersDiscussions);
        scUsersDiscussionsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scUsersDiscussions.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sc-users-discussions : get all the scUsersDiscussions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of scUsersDiscussions in body
     */
    @GetMapping("/sc-users-discussions")
    @Timed
    public List<ScUsersDiscussions> getAllScUsersDiscussions() {
        log.debug("REST request to get all ScUsersDiscussions");
        List<ScUsersDiscussions> scUsersDiscussions = scUsersDiscussionsRepository.findAll();
        return scUsersDiscussions;
    }

    /**
     * GET  /sc-users-discussions/:id : get the "id" scUsersDiscussions.
     *
     * @param id the id of the scUsersDiscussions to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scUsersDiscussions, or with status 404 (Not Found)
     */
    @GetMapping("/sc-users-discussions/{id}")
    @Timed
    public ResponseEntity<ScUsersDiscussions> getScUsersDiscussions(@PathVariable Long id) {
        log.debug("REST request to get ScUsersDiscussions : {}", id);
        ScUsersDiscussions scUsersDiscussions = scUsersDiscussionsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(scUsersDiscussions));
    }

    /**
     * DELETE  /sc-users-discussions/:id : delete the "id" scUsersDiscussions.
     *
     * @param id the id of the scUsersDiscussions to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sc-users-discussions/{id}")
    @Timed
    public ResponseEntity<Void> deleteScUsersDiscussions(@PathVariable Long id) {
        log.debug("REST request to delete ScUsersDiscussions : {}", id);
        scUsersDiscussionsRepository.delete(id);
        scUsersDiscussionsSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/sc-users-discussions?query=:query : search for the scUsersDiscussions corresponding
     * to the query.
     *
     * @param query the query of the scUsersDiscussions search 
     * @return the result of the search
     */
    @GetMapping("/_search/sc-users-discussions")
    @Timed
    public List<ScUsersDiscussions> searchScUsersDiscussions(@RequestParam String query) {
        log.debug("REST request to search ScUsersDiscussions for query {}", query);
        return StreamSupport
            .stream(scUsersDiscussionsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }


}
