package com.atom.coco.repository.search;

import com.atom.coco.domain.ScDiscussions;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ScDiscussions entity.
 */
public interface ScDiscussionsSearchRepository extends ElasticsearchRepository<ScDiscussions, Long> {
}
