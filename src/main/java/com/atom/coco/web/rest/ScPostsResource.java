package com.atom.coco.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.atom.coco.domain.ScPosts;
import com.atom.coco.service.ScPostsService;
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
 * REST controller for managing ScPosts.
 */
@RestController
@RequestMapping("/api")
public class ScPostsResource {

    private final Logger log = LoggerFactory.getLogger(ScPostsResource.class);

    private static final String ENTITY_NAME = "scPosts";
        
    private final ScPostsService scPostsService;

    public ScPostsResource(ScPostsService scPostsService) {
        this.scPostsService = scPostsService;
    }

    /**
     * POST  /sc-posts : Create a new scPosts.
     *
     * @param scPosts the scPosts to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scPosts, or with status 400 (Bad Request) if the scPosts has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sc-posts")
    @Timed
    public ResponseEntity<ScPosts> createScPosts(@RequestBody ScPosts scPosts) throws URISyntaxException {
        log.debug("REST request to save ScPosts : {}", scPosts);
        if (scPosts.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new scPosts cannot already have an ID")).body(null);
        }
        ScPosts result = scPostsService.save(scPosts);
        return ResponseEntity.created(new URI("/api/sc-posts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sc-posts : Updates an existing scPosts.
     *
     * @param scPosts the scPosts to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scPosts,
     * or with status 400 (Bad Request) if the scPosts is not valid,
     * or with status 500 (Internal Server Error) if the scPosts couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sc-posts")
    @Timed
    public ResponseEntity<ScPosts> updateScPosts(@RequestBody ScPosts scPosts) throws URISyntaxException {
        log.debug("REST request to update ScPosts : {}", scPosts);
        if (scPosts.getId() == null) {
            return createScPosts(scPosts);
        }
        ScPosts result = scPostsService.save(scPosts);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scPosts.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sc-posts : get all the scPosts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of scPosts in body
     */
    @GetMapping("/sc-posts")
    @Timed
    public List<ScPosts> getAllScPosts() {
        log.debug("REST request to get all ScPosts");
        return scPostsService.findAll();
    }

    /**
     * GET  /sc-posts/:id : get the "id" scPosts.
     *
     * @param id the id of the scPosts to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scPosts, or with status 404 (Not Found)
     */
    @GetMapping("/sc-posts/{id}")
    @Timed
    public ResponseEntity<ScPosts> getScPosts(@PathVariable Long id) {
        log.debug("REST request to get ScPosts : {}", id);
        ScPosts scPosts = scPostsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(scPosts));
    }

    /**
     * DELETE  /sc-posts/:id : delete the "id" scPosts.
     *
     * @param id the id of the scPosts to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sc-posts/{id}")
    @Timed
    public ResponseEntity<Void> deleteScPosts(@PathVariable Long id) {
        log.debug("REST request to delete ScPosts : {}", id);
        scPostsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/sc-posts?query=:query : search for the scPosts corresponding
     * to the query.
     *
     * @param query the query of the scPosts search 
     * @return the result of the search
     */
    @GetMapping("/_search/sc-posts")
    @Timed
    public List<ScPosts> searchScPosts(@RequestParam String query) {
        log.debug("REST request to search ScPosts for query {}", query);
        return scPostsService.search(query);
    }


}
