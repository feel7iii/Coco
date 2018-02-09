package com.atom.coco.repository.search;

import com.atom.coco.domain.ScGroups;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ScGroups entity.
 */
public interface ScGroupsSearchRepository extends ElasticsearchRepository<ScGroups, Long> {
}
