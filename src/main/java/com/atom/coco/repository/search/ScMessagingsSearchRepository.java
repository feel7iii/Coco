package com.atom.coco.repository.search;

import com.atom.coco.domain.ScMessagings;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ScMessagings entity.
 */
public interface ScMessagingsSearchRepository extends ElasticsearchRepository<ScMessagings, Long> {
}
