package com.atom.coco.repository.search;

import com.atom.coco.domain.ScPostsMentions;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ScPostsMentions entity.
 */
public interface ScPostsMentionsSearchRepository extends ElasticsearchRepository<ScPostsMentions, Long> {
}
