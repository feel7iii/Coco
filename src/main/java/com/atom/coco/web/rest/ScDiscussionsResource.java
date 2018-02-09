package com.atom.coco.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.atom.coco.domain.ScDiscussions;
import com.atom.coco.service.ScDiscussionsService;
import com.atom.coco.web.rest.util.HeaderUtil;
import com.atom.coco.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
 * REST controller for managing ScDiscussions.
 */
@RestController
@RequestMapping("/api")
public class ScDiscussionsResource {

    private final Logger log = LoggerFactory.getLogger(ScDiscussionsResource.class);

    private static final String ENTITY_NAME = "scDiscussions";
        
    private final ScDiscussionsService scDiscussionsService;

    public ScDiscussionsResource(ScDiscussionsService scDiscussionsService) {
        this.scDiscussionsService = scDiscussionsService;
    }

    /**
     * POST  /sc-discussions : Create a new scDiscussions.
     *
     * @param scDiscussions the scDiscussions to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scDiscussions, or with status 400 (Bad Request) if the scDiscussions has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sc-discussions")
    @Timed
    public ResponseEntity<ScDiscussions> createScDiscussions(@Valid @RequestBody ScDiscussions scDiscussions) throws URISyntaxException {
        log.debug("REST request to save ScDiscussions : {}", scDiscussions);
        if (scDiscussions.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new scDiscussions cannot already have an ID")).body(null);
        }
        ScDiscussions result = scDiscussionsService.save(scDiscussions);
        return ResponseEntity.created(new URI("/api/sc-discussions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sc-discussions : Updates an existing scDiscussions.
     *
     * @param scDiscussions the scDiscussions to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scDiscussions,
     * or with status 400 (Bad Request) if the scDiscussions is not valid,
     * or with status 500 (Internal Server Error) if the scDiscussions couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sc-discussions")
    @Timed
    public ResponseEntity<ScDiscussions> updateScDiscussions(@Valid @RequestBody ScDiscussions scDiscussions) throws URISyntaxException {
        log.debug("REST request to update ScDiscussions : {}", scDiscussions);
        if (scDiscussions.getId() == null) {
            return createScDiscussions(scDiscussions);
        }
        ScDiscussions result = scDiscussionsService.save(scDiscussions);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scDiscussions.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sc-discussions : get all the scDiscussions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of scDiscussions in body
     */
    @GetMapping("/sc-discussions")
    @Timed
    public ResponseEntity<List<ScDiscussions>> getAllScDiscussions(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of ScDiscussions");
        Page<ScDiscussions> page = scDiscussionsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sc-discussions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sc-discussions/:id : get the "id" scDiscussions.
     *
     * @param id the id of the scDiscussions to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scDiscussions, or with status 404 (Not Found)
     */
    @GetMapping("/sc-discussions/{id}")
    @Timed
    public ResponseEntity<ScDiscussions> getScDiscussions(@PathVariable Long id) {
        log.debug("REST request to get ScDiscussions : {}", id);
        ScDiscussions scDiscussions = scDiscussionsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(scDiscussions));
    }

    /**
     * DELETE  /sc-discussions/:id : delete the "id" scDiscussions.
     *
     * @param id the id of the scDiscussions to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sc-discussions/{id}")
    @Timed
    public ResponseEntity<Void> deleteScDiscussions(@PathVariable Long id) {
        log.debug("REST request to delete ScDiscussions : {}", id);
        scDiscussionsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/sc-discussions?query=:query : search for the scDiscussions corresponding
     * to the query.
     *
     * @param query the query of the scDiscussions search 
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/sc-discussions")
    @Timed
    public ResponseEntity<List<ScDiscussions>> searchScDiscussions(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of ScDiscussions for query {}", query);
        Page<ScDiscussions> page = scDiscussionsService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/sc-discussions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


}
