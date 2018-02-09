package com.atom.coco.service;

import com.atom.coco.domain.ScTags;
import com.atom.coco.repository.ScTagsRepository;
import com.atom.coco.repository.search.ScTagsSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing ScTags.
 */
@Service
@Transactional
public class ScTagsService {

    private final Logger log = LoggerFactory.getLogger(ScTagsService.class);
    
    private final ScTagsRepository scTagsRepository;

    private final ScTagsSearchRepository scTagsSearchRepository;

    public ScTagsService(ScTagsRepository scTagsRepository, ScTagsSearchRepository scTagsSearchRepository) {
        this.scTagsRepository = scTagsRepository;
        this.scTagsSearchRepository = scTagsSearchRepository;
    }

    /**
     * Save a scTags.
     *
     * @param scTags the entity to save
     * @return the persisted entity
     */
    public ScTags save(ScTags scTags) {
        log.debug("Request to save ScTags : {}", scTags);
        ScTags result = scTagsRepository.save(scTags);
        scTagsSearchRepository.save(result);
        return result;
    }

    /**
     *  Get all the scTags.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ScTags> findAll() {
        log.debug("Request to get all ScTags");
        List<ScTags> result = scTagsRepository.findAll();

        return result;
    }

    /**
     *  Get one scTags by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public ScTags findOne(Long id) {
        log.debug("Request to get ScTags : {}", id);
        ScTags scTags = scTagsRepository.findOne(id);
        return scTags;
    }

    /**
     *  Delete the  scTags by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ScTags : {}", id);
        scTagsRepository.delete(id);
        scTagsSearchRepository.delete(id);
    }

    /**
     * Search for the scTags corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ScTags> search(String query) {
        log.debug("Request to search ScTags for query {}", query);
        return StreamSupport
            .stream(scTagsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
