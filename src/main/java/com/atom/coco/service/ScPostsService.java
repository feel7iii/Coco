package com.atom.coco.service;

import com.atom.coco.domain.ScPosts;
import com.atom.coco.repository.ScPostsRepository;
import com.atom.coco.repository.search.ScPostsSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing ScPosts.
 */
@Service
@Transactional
public class ScPostsService {

    private final Logger log = LoggerFactory.getLogger(ScPostsService.class);
    
    private final ScPostsRepository scPostsRepository;

    private final ScPostsSearchRepository scPostsSearchRepository;

    public ScPostsService(ScPostsRepository scPostsRepository, ScPostsSearchRepository scPostsSearchRepository) {
        this.scPostsRepository = scPostsRepository;
        this.scPostsSearchRepository = scPostsSearchRepository;
    }

    /**
     * Save a scPosts.
     *
     * @param scPosts the entity to save
     * @return the persisted entity
     */
    public ScPosts save(ScPosts scPosts) {
        log.debug("Request to save ScPosts : {}", scPosts);
        ScPosts result = scPostsRepository.save(scPosts);
        scPostsSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the scPosts.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ScPosts> findAll() {
        log.debug("Request to get all ScPosts");
        List<ScPosts> result = scPostsRepository.findAll();

        return result;
    }

    /**
     *  Get one scPosts by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public ScPosts findOne(Long id) {
        log.debug("Request to get ScPosts : {}", id);
        ScPosts scPosts = scPostsRepository.findOne(id);
        return scPosts;
    }

    /**
     *  Delete the  scPosts by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ScPosts : {}", id);
        scPostsRepository.delete(id);
        scPostsSearchRepository.delete(id);
    }

    /**
     * Search for the scPosts corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ScPosts> search(String query) {
        log.debug("Request to search ScPosts for query {}", query);
        return StreamSupport
            .stream(scPostsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
