package com.atom.coco.repository.search;

import com.atom.coco.domain.ScTags;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ScTags entity.
 */
public interface ScTagsSearchRepository extends ElasticsearchRepository<ScTags, Long> {
}
