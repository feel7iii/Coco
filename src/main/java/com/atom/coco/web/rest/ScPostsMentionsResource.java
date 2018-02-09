package com.atom.coco.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.atom.coco.domain.ScPostsMentions;

import com.atom.coco.repository.ScPostsMentionsRepository;
import com.atom.coco.repository.search.ScPostsMentionsSearchRepository;
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
 * REST controller for managing ScPostsMentions.
 */
@RestController
@RequestMapping("/api")
public class ScPostsMentionsResource {

    private final Logger log = LoggerFactory.getLogger(ScPostsMentionsResource.class);

    private static final String ENTITY_NAME = "scPostsMentions";
        
    private final ScPostsMentionsRepository scPostsMentionsRepository;

    private final ScPostsMentionsSearchRepository scPostsMentionsSearchRepository;

    public ScPostsMentionsResource(ScPostsMentionsRepository scPostsMentionsRepository, ScPostsMentionsSearchRepository scPostsMentionsSearchRepository) {
        this.scPostsMentionsRepository = scPostsMentionsRepository;
        this.scPostsMentionsSearchRepository = scPostsMentionsSearchRepository;
    }

    /**
     * POST  /sc-posts-mentions : Create a new scPostsMentions.
     *
     * @param scPostsMentions the scPostsMentions to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scPostsMentions, or with status 400 (Bad Request) if the scPostsMentions has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sc-posts-mentions")
    @Timed
    public ResponseEntity<ScPostsMentions> createScPostsMentions(@RequestBody ScPostsMentions scPostsMentions) throws URISyntaxException {
        log.debug("REST request to save ScPostsMentions : {}", scPostsMentions);
        if (scPostsMentions.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new scPostsMentions cannot already have an ID")).body(null);
        }
        ScPostsMentions result = scPostsMentionsRepository.save(scPostsMentions);
        scPostsMentionsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/sc-posts-mentions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sc-posts-mentions : Updates an existing scPostsMentions.
     *
     * @param scPostsMentions the scPostsMentions to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scPostsMentions,
     * or with status 400 (Bad Request) if the scPostsMentions is not valid,
     * or with status 500 (Internal Server Error) if the scPostsMentions couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sc-posts-mentions")
    @Timed
    public ResponseEntity<ScPostsMentions> updateScPostsMentions(@RequestBody ScPostsMentions scPostsMentions) throws URISyntaxException {
        log.debug("REST request to update ScPostsMentions : {}", scPostsMentions);
        if (scPostsMentions.getId() == null) {
            return createScPostsMentions(scPostsMentions);
        }
        ScPostsMentions result = scPostsMentionsRepository.save(scPostsMentions);
        scPostsMentionsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scPostsMentions.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sc-posts-mentions : get all the scPostsMentions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of scPostsMentions in body
     */
    @GetMapping("/sc-posts-mentions")
    @Timed
    public List<ScPostsMentions> getAllScPostsMentions() {
        log.debug("REST request to get all ScPostsMentions");
        List<ScPostsMentions> scPostsMentions = scPostsMentionsRepository.findAll();
        return scPostsMentions;
    }

    /**
     * GET  /sc-posts-mentions/:id : get the "id" scPostsMentions.
     *
     * @param id the id of the scPostsMentions to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scPostsMentions, or with status 404 (Not Found)
     */
    @GetMapping("/sc-posts-mentions/{id}")
    @Timed
    public ResponseEntity<ScPostsMentions> getScPostsMentions(@PathVariable Long id) {
        log.debug("REST request to get ScPostsMentions : {}", id);
        ScPostsMentions scPostsMentions = scPostsMentionsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(scPostsMentions));
    }

    /**
     * DELETE  /sc-posts-mentions/:id : delete the "id" scPostsMentions.
     *
     * @param id the id of the scPostsMentions to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sc-posts-mentions/{id}")
    @Timed
    public ResponseEntity<Void> deleteScPostsMentions(@PathVariable Long id) {
        log.debug("REST request to delete ScPostsMentions : {}", id);
        scPostsMentionsRepository.delete(id);
        scPostsMentionsSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/sc-posts-mentions?query=:query : search for the scPostsMentions corresponding
     * to the query.
     *
     * @param query the query of the scPostsMentions search 
     * @return the result of the search
     */
    @GetMapping("/_search/sc-posts-mentions")
    @Timed
    public List<ScPostsMentions> searchScPostsMentions(@RequestParam String query) {
        log.debug("REST request to search ScPostsMentions for query {}", query);
        return StreamSupport
            .stream(scPostsMentionsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }


}
