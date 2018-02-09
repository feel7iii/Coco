package com.atom.coco.repository.search;

import com.atom.coco.domain.ScFlags;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ScFlags entity.
 */
public interface ScFlagsSearchRepository extends ElasticsearchRepository<ScFlags, Long> {
}
