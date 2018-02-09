package com.atom.coco.service;

import com.atom.coco.domain.ScDiscussions;
import com.atom.coco.repository.ScDiscussionsRepository;
import com.atom.coco.repository.search.ScDiscussionsSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing ScDiscussions.
 */
@Service
@Transactional
public class ScDiscussionsService {

    private final Logger log = LoggerFactory.getLogger(ScDiscussionsService.class);
    
    private final ScDiscussionsRepository scDiscussionsRepository;

    private final ScDiscussionsSearchRepository scDiscussionsSearchRepository;

    public ScDiscussionsService(ScDiscussionsRepository scDiscussionsRepository, ScDiscussionsSearchRepository scDiscussionsSearchRepository) {
        this.scDiscussionsRepository = scDiscussionsRepository;
        this.scDiscussionsSearchRepository = scDiscussionsSearchRepository;
    }

    /**
     * Save a scDiscussions.
     *
     * @param scDiscussions the entity to save
     * @return the persisted entity
     */
    public ScDiscussions save(ScDiscussions scDiscussions) {
        log.debug("Request to save ScDiscussions : {}", scDiscussions);
        ScDiscussions result = scDiscussionsRepository.save(scDiscussions);
        scDiscussionsSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the scDiscussions.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ScDiscussions> findAll(Pageable pageable) {
        log.debug("Request to get all ScDiscussions");
        Page<ScDiscussions> result = scDiscussionsRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one scDiscussions by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public ScDiscussions findOne(Long id) {
        log.debug("Request to get ScDiscussions : {}", id);
        ScDiscussions scDiscussions = scDiscussionsRepository.findOneWithEagerRelationships(id);
        return scDiscussions;
    }

    /**
     *  Delete the  scDiscussions by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ScDiscussions : {}", id);
        scDiscussionsRepository.delete(id);
        scDiscussionsSearchRepository.delete(id);
    }

    /**
     * Search for the scDiscussions corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ScDiscussions> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ScDiscussions for query {}", query);
        Page<ScDiscussions> result = scDiscussionsSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
