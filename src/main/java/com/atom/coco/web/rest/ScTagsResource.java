package com.atom.coco.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.atom.coco.domain.ScTags;
import com.atom.coco.service.ScTagsService;
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
 * REST controller for managing ScTags.
 */
@RestController
@RequestMapping("/api")
public class ScTagsResource {

    private final Logger log = LoggerFactory.getLogger(ScTagsResource.class);

    private static final String ENTITY_NAME = "scTags";
        
    private final ScTagsService scTagsService;

    public ScTagsResource(ScTagsService scTagsService) {
        this.scTagsService = scTagsService;
    }

    /**
     * POST  /sc-tags : Create a new scTags.
     *
     * @param scTags the scTags to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scTags, or with status 400 (Bad Request) if the scTags has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sc-tags")
    @Timed
    public ResponseEntity<ScTags> createScTags(@Valid @RequestBody ScTags scTags) throws URISyntaxException {
        log.debug("REST request to save ScTags : {}", scTags);
        if (scTags.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new scTags cannot already have an ID")).body(null);
        }
        ScTags result = scTagsService.save(scTags);
        return ResponseEntity.created(new URI("/api/sc-tags/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sc-tags : Updates an existing scTags.
     *
     * @param scTags the scTags to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scTags,
     * or with status 400 (Bad Request) if the scTags is not valid,
     * or with status 500 (Internal Server Error) if the scTags couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sc-tags")
    @Timed
    public ResponseEntity<ScTags> updateScTags(@Valid @RequestBody ScTags scTags) throws URISyntaxException {
        log.debug("REST request to update ScTags : {}", scTags);
        if (scTags.getId() == null) {
            return createScTags(scTags);
        }
        ScTags result = scTagsService.save(scTags);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scTags.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sc-tags : get all the scTags.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of scTags in body
     */
    @GetMapping("/sc-tags")
    @Timed
    public List<ScTags> getAllScTags() {
        log.debug("REST request to get all ScTags");
        return scTagsService.findAll();
    }

    /**
     * GET  /sc-tags/:id : get the "id" scTags.
     *
     * @param id the id of the scTags to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scTags, or with status 404 (Not Found)
     */
    @GetMapping("/sc-tags/{id}")
    @Timed
    public ResponseEntity<ScTags> getScTags(@PathVariable Long id) {
        log.debug("REST request to get ScTags : {}", id);
        ScTags scTags = scTagsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(scTags));
    }

    /**
     * DELETE  /sc-tags/:id : delete the "id" scTags.
     *
     * @param id the id of the scTags to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sc-tags/{id}")
    @Timed
    public ResponseEntity<Void> deleteScTags(@PathVariable Long id) {
        log.debug("REST request to delete ScTags : {}", id);
        scTagsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/sc-tags?query=:query : search for the scTags corresponding
     * to the query.
     *
     * @param query the query of the scTags search 
     * @return the result of the search
     */
    @GetMapping("/_search/sc-tags")
    @Timed
    public List<ScTags> searchScTags(@RequestParam String query) {
        log.debug("REST request to search ScTags for query {}", query);
        return scTagsService.search(query);
    }


}
