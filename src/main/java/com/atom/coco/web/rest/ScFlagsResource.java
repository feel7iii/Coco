package com.atom.coco.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.atom.coco.domain.ScFlags;

import com.atom.coco.repository.ScFlagsRepository;
import com.atom.coco.repository.search.ScFlagsSearchRepository;
import com.atom.coco.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing ScFlags.
 */
@RestController
@RequestMapping("/api")
public class ScFlagsResource {

    private final Logger log = LoggerFactory.getLogger(ScFlagsResource.class);

    private static final String ENTITY_NAME = "scFlags";
        
    private final ScFlagsRepository scFlagsRepository;

    private final ScFlagsSearchRepository scFlagsSearchRepository;

    public ScFlagsResource(ScFlagsRepository scFlagsRepository, ScFlagsSearchRepository scFlagsSearchRepository) {
        this.scFlagsRepository = scFlagsRepository;
        this.scFlagsSearchRepository = scFlagsSearchRepository;
    }

    /**
     * POST  /sc-flags : Create a new scFlags.
     *
     * @param scFlags the scFlags to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scFlags, or with status 400 (Bad Request) if the scFlags has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sc-flags")
    @Timed
    public ResponseEntity<ScFlags> createScFlags(@Valid @RequestBody ScFlags scFlags) throws URISyntaxException {
        log.debug("REST request to save ScFlags : {}", scFlags);
        if (scFlags.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new scFlags cannot already have an ID")).body(null);
        }
        ScFlags result = scFlagsRepository.save(scFlags);
        scFlagsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/sc-flags/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sc-flags : Updates an existing scFlags.
     *
     * @param scFlags the scFlags to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scFlags,
     * or with status 400 (Bad Request) if the scFlags is not valid,
     * or with status 500 (Internal Server Error) if the scFlags couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sc-flags")
    @Timed
    public ResponseEntity<ScFlags> updateScFlags(@Valid @RequestBody ScFlags scFlags) throws URISyntaxException {
        log.debug("REST request to update ScFlags : {}", scFlags);
        if (scFlags.getId() == null) {
            return createScFlags(scFlags);
        }
        ScFlags result = scFlagsRepository.save(scFlags);
        scFlagsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scFlags.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sc-flags : get all the scFlags.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of scFlags in body
     */
    @GetMapping("/sc-flags")
    @Timed
    public List<ScFlags> getAllScFlags() {
        log.debug("REST request to get all ScFlags");
        List<ScFlags> scFlags = scFlagsRepository.findAll();
        return scFlags;
    }

    /**
     * GET  /sc-flags/:id : get the "id" scFlags.
     *
     * @param id the id of the scFlags to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scFlags, or with status 404 (Not Found)
     */
    @GetMapping("/sc-flags/{id}")
    @Timed
    public ResponseEntity<ScFlags> getScFlags(@PathVariable Long id) {
        log.debug("REST request to get ScFlags : {}", id);
        ScFlags scFlags = scFlagsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(scFlags));
    }

    /**
     * DELETE  /sc-flags/:id : delete the "id" scFlags.
     *
     * @param id the id of the scFlags to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sc-flags/{id}")
    @Timed
    public ResponseEntity<Void> deleteScFlags(@PathVariable Long id) {
        log.debug("REST request to delete ScFlags : {}", id);
        scFlagsRepository.delete(id);
        scFlagsSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/sc-flags?query=:query : search for the scFlags corresponding
     * to the query.
     *
     * @param query the query of the scFlags search 
     * @return the result of the search
     */
    @GetMapping("/_search/sc-flags")
    @Timed
    public List<ScFlags> searchScFlags(@RequestParam String query) {
        log.debug("REST request to search ScFlags for query {}", query);
        return StreamSupport
            .stream(scFlagsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }


}
