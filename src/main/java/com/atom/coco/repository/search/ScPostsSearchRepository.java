package com.atom.coco.repository.search;

import com.atom.coco.domain.ScPosts;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ScPosts entity.
 */
public interface ScPostsSearchRepository extends ElasticsearchRepository<ScPosts, Long> {
}
