package com.atom.coco.repository.search;

import com.atom.coco.domain.ScUsersDiscussions;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ScUsersDiscussions entity.
 */
public interface ScUsersDiscussionsSearchRepository extends ElasticsearchRepository<ScUsersDiscussions, Long> {
}
