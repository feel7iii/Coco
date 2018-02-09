package com.atom.coco.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.atom.coco.domain.ScGroups;

import com.atom.coco.repository.ScGroupsRepository;
import com.atom.coco.repository.search.ScGroupsSearchRepository;
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
 * REST controller for managing ScGroups.
 */
@RestController
@RequestMapping("/api")
public class ScGroupsResource {

    private final Logger log = LoggerFactory.getLogger(ScGroupsResource.class);

    private static final String ENTITY_NAME = "scGroups";
        
    private final ScGroupsRepository scGroupsRepository;

    private final ScGroupsSearchRepository scGroupsSearchRepository;

    public ScGroupsResource(ScGroupsRepository scGroupsRepository, ScGroupsSearchRepository scGroupsSearchRepository) {
        this.scGroupsRepository = scGroupsRepository;
        this.scGroupsSearchRepository = scGroupsSearchRepository;
    }

    /**
     * POST  /sc-groups : Create a new scGroups.
     *
     * @param scGroups the scGroups to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scGroups, or with status 400 (Bad Request) if the scGroups has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sc-groups")
    @Timed
    public ResponseEntity<ScGroups> createScGroups(@RequestBody ScGroups scGroups) throws URISyntaxException {
        log.debug("REST request to save ScGroups : {}", scGroups);
        if (scGroups.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new scGroups cannot already have an ID")).body(null);
        }
        ScGroups result = scGroupsRepository.save(scGroups);
        scGroupsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/sc-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sc-groups : Updates an existing scGroups.
     *
     * @param scGroups the scGroups to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scGroups,
     * or with status 400 (Bad Request) if the scGroups is not valid,
     * or with status 500 (Internal Server Error) if the scGroups couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sc-groups")
    @Timed
    public ResponseEntity<ScGroups> updateScGroups(@RequestBody ScGroups scGroups) throws URISyntaxException {
        log.debug("REST request to update ScGroups : {}", scGroups);
        if (scGroups.getId() == null) {
            return createScGroups(scGroups);
        }
        ScGroups result = scGroupsRepository.save(scGroups);
        scGroupsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scGroups.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sc-groups : get all the scGroups.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of scGroups in body
     */
    @GetMapping("/sc-groups")
    @Timed
    public List<ScGroups> getAllScGroups() {
        log.debug("REST request to get all ScGroups");
        List<ScGroups> scGroups = scGroupsRepository.findAllWithEagerRelationships();
        return scGroups;
    }

    /**
     * GET  /sc-groups/:id : get the "id" scGroups.
     *
     * @param id the id of the scGroups to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scGroups, or with status 404 (Not Found)
     */
    @GetMapping("/sc-groups/{id}")
    @Timed
    public ResponseEntity<ScGroups> getScGroups(@PathVariable Long id) {
        log.debug("REST request to get ScGroups : {}", id);
        ScGroups scGroups = scGroupsRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(scGroups));
    }

    /**
     * DELETE  /sc-groups/:id : delete the "id" scGroups.
     *
     * @param id the id of the scGroups to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sc-groups/{id}")
    @Timed
    public ResponseEntity<Void> deleteScGroups(@PathVariable Long id) {
        log.debug("REST request to delete ScGroups : {}", id);
        scGroupsRepository.delete(id);
        scGroupsSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/sc-groups?query=:query : search for the scGroups corresponding
     * to the query.
     *
     * @param query the query of the scGroups search 
     * @return the result of the search
     */
    @GetMapping("/_search/sc-groups")
    @Timed
    public List<ScGroups> searchScGroups(@RequestParam String query) {
        log.debug("REST request to search ScGroups for query {}", query);
        return StreamSupport
            .stream(scGroupsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }


}
