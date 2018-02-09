package com.atom.coco.repository.search;

import com.atom.coco.domain.ScSettings;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ScSettings entity.
 */
public interface ScSettingsSearchRepository extends ElasticsearchRepository<ScSettings, Long> {
}
