package com.atom.coco.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ScTags.
 */
@Entity
@Table(name = "sc_tags")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "sctags")
public class ScTags implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "name", length = 64, nullable = false)
    private String name;

    @Column(name = "slug")
    private String slug;

    @Lob
    @Column(name = "description")
    private byte[] description;

    @Column(name = "description_content_type")
    private String descriptionContentType;

    @Column(name = "color")
    private String color;

    @Column(name = "background_path")
    private String backgroundPath;

    @Column(name = "background_mode")
    private String backgroundMode;

    @Column(name = "position")
    private Integer position;

    @Column(name = "parent_id")
    private Integer parentId;

    @Column(name = "default_sort")
    private String defaultSort;

    @Column(name = "is_restricted")
    private Integer isRestricted;

    @Column(name = "is_hidden")
    private Integer isHidden;

    @Column(name = "discussions_count")
    private Integer discussionsCount;

    @Column(name = "last_time")
    private ZonedDateTime lastTime;

    @Column(name = "last_discussion_id")
    private Integer lastDiscussionId;

    @ManyToOne
    private User user;

    @ManyToOne
    private ScTags scTags;

    @ManyToMany(mappedBy = "scTags")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ScDiscussions> scDiscussions = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ScTags name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public ScTags slug(String slug) {
        this.slug = slug;
        return this;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public byte[] getDescription() {
        return description;
    }

    public ScTags description(byte[] description) {
        this.description = description;
        return this;
    }

    public void setDescription(byte[] description) {
        this.description = description;
    }

    public String getDescriptionContentType() {
        return descriptionContentType;
    }

    public ScTags descriptionContentType(String descriptionContentType) {
        this.descriptionContentType = descriptionContentType;
        return this;
    }

    public void setDescriptionContentType(String descriptionContentType) {
        this.descriptionContentType = descriptionContentType;
    }

    public String getColor() {
        return color;
    }

    public ScTags color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBackgroundPath() {
        return backgroundPath;
    }

    public ScTags backgroundPath(String backgroundPath) {
        this.backgroundPath = backgroundPath;
        return this;
    }

    public void setBackgroundPath(String backgroundPath) {
        this.backgroundPath = backgroundPath;
    }

    public String getBackgroundMode() {
        return backgroundMode;
    }

    public ScTags backgroundMode(String backgroundMode) {
        this.backgroundMode = backgroundMode;
        return this;
    }

    public void setBackgroundMode(String backgroundMode) {
        this.backgroundMode = backgroundMode;
    }

    public Integer getPosition() {
        return position;
    }

    public ScTags position(Integer position) {
        this.position = position;
        return this;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public Integer getParentId() {
        return parentId;
    }

    public ScTags parentId(Integer parentId) {
        this.parentId = parentId;
        return this;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public String getDefaultSort() {
        return defaultSort;
    }

    public ScTags defaultSort(String defaultSort) {
        this.defaultSort = defaultSort;
        return this;
    }

    public void setDefaultSort(String defaultSort) {
        this.defaultSort = defaultSort;
    }

    public Integer getIsRestricted() {
        return isRestricted;
    }

    public ScTags isRestricted(Integer isRestricted) {
        this.isRestricted = isRestricted;
        return this;
    }

    public void setIsRestricted(Integer isRestricted) {
        this.isRestricted = isRestricted;
    }

    public Integer getIsHidden() {
        return isHidden;
    }

    public ScTags isHidden(Integer isHidden) {
        this.isHidden = isHidden;
        return this;
    }

    public void setIsHidden(Integer isHidden) {
        this.isHidden = isHidden;
    }

    public Integer getDiscussionsCount() {
        return discussionsCount;
    }

    public ScTags discussionsCount(Integer discussionsCount) {
        this.discussionsCount = discussionsCount;
        return this;
    }

    public void setDiscussionsCount(Integer discussionsCount) {
        this.discussionsCount = discussionsCount;
    }

    public ZonedDateTime getLastTime() {
        return lastTime;
    }

    public ScTags lastTime(ZonedDateTime lastTime) {
        this.lastTime = lastTime;
        return this;
    }

    public void setLastTime(ZonedDateTime lastTime) {
        this.lastTime = lastTime;
    }

    public Integer getLastDiscussionId() {
        return lastDiscussionId;
    }

    public ScTags lastDiscussionId(Integer lastDiscussionId) {
        this.lastDiscussionId = lastDiscussionId;
        return this;
    }

    public void setLastDiscussionId(Integer lastDiscussionId) {
        this.lastDiscussionId = lastDiscussionId;
    }

    public User getUser() {
        return user;
    }

    public ScTags user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ScTags getScTags() {
        return scTags;
    }

    public ScTags scTags(ScTags scTags) {
        this.scTags = scTags;
        return this;
    }

    public void setScTags(ScTags scTags) {
        this.scTags = scTags;
    }

    public Set<ScDiscussions> getScDiscussions() {
        return scDiscussions;
    }

    public ScTags scDiscussions(Set<ScDiscussions> scDiscussions) {
        this.scDiscussions = scDiscussions;
        return this;
    }

    public ScTags addScDiscussions(ScDiscussions scDiscussions) {
        this.scDiscussions.add(scDiscussions);
        scDiscussions.getScTags().add(this);
        return this;
    }

    public ScTags removeScDiscussions(ScDiscussions scDiscussions) {
        this.scDiscussions.remove(scDiscussions);
        scDiscussions.getScTags().remove(this);
        return this;
    }

    public void setScDiscussions(Set<ScDiscussions> scDiscussions) {
        this.scDiscussions = scDiscussions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ScTags scTags = (ScTags) o;
        if (scTags.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, scTags.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ScTags{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", slug='" + slug + "'" +
            ", description='" + description + "'" +
            ", descriptionContentType='" + descriptionContentType + "'" +
            ", color='" + color + "'" +
            ", backgroundPath='" + backgroundPath + "'" +
            ", backgroundMode='" + backgroundMode + "'" +
            ", position='" + position + "'" +
            ", parentId='" + parentId + "'" +
            ", defaultSort='" + defaultSort + "'" +
            ", isRestricted='" + isRestricted + "'" +
            ", isHidden='" + isHidden + "'" +
            ", discussionsCount='" + discussionsCount + "'" +
            ", lastTime='" + lastTime + "'" +
            ", lastDiscussionId='" + lastDiscussionId + "'" +
            '}';
    }
}
