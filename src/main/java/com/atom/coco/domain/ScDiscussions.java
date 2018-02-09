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
 * A ScDiscussions.
 */
@Entity
@Table(name = "sc_discussions")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "scdiscussions")
public class ScDiscussions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "title", length = 64, nullable = false)
    private String title;

    @Column(name = "comments_count")
    private Integer commentsCount;

    @Column(name = "participants_count")
    private Integer participantsCount;

    @Column(name = "number_index")
    private Integer numberIndex;

    @Column(name = "start_time")
    private ZonedDateTime startTime;

    @Column(name = "start_user_id")
    private Integer startUserId;

    @Column(name = "start_post_id")
    private Integer startPostId;

    @Column(name = "last_time")
    private ZonedDateTime lastTime;

    @Column(name = "last_user_id")
    private Integer lastUserId;

    @Column(name = "last_post_id")
    private Integer lastPostId;

    @Column(name = "last_post_number")
    private Integer lastPostNumber;

    @Column(name = "hide_time")
    private ZonedDateTime hideTime;

    @Column(name = "hide_user_id")
    private Integer hideUserId;

    @Column(name = "is_approved")
    private Integer isApproved;

    @Column(name = "is_locked")
    private Integer isLocked;

    @Column(name = "is_sticky")
    private Integer isSticky;

    @OneToMany(mappedBy = "scDiscussions")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ScUsersDiscussions> scUsersDiscussions = new HashSet<>();

    @OneToMany(mappedBy = "scDiscussions")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ScPosts> scPosts = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "sc_discussions_sc_tags",
               joinColumns = @JoinColumn(name="sc_discussions_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="sc_tags_id", referencedColumnName="id"))
    private Set<ScTags> scTags = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public ScDiscussions title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getCommentsCount() {
        return commentsCount;
    }

    public ScDiscussions commentsCount(Integer commentsCount) {
        this.commentsCount = commentsCount;
        return this;
    }

    public void setCommentsCount(Integer commentsCount) {
        this.commentsCount = commentsCount;
    }

    public Integer getParticipantsCount() {
        return participantsCount;
    }

    public ScDiscussions participantsCount(Integer participantsCount) {
        this.participantsCount = participantsCount;
        return this;
    }

    public void setParticipantsCount(Integer participantsCount) {
        this.participantsCount = participantsCount;
    }

    public Integer getNumberIndex() {
        return numberIndex;
    }

    public ScDiscussions numberIndex(Integer numberIndex) {
        this.numberIndex = numberIndex;
        return this;
    }

    public void setNumberIndex(Integer numberIndex) {
        this.numberIndex = numberIndex;
    }

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public ScDiscussions startTime(ZonedDateTime startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    public Integer getStartUserId() {
        return startUserId;
    }

    public ScDiscussions startUserId(Integer startUserId) {
        this.startUserId = startUserId;
        return this;
    }

    public void setStartUserId(Integer startUserId) {
        this.startUserId = startUserId;
    }

    public Integer getStartPostId() {
        return startPostId;
    }

    public ScDiscussions startPostId(Integer startPostId) {
        this.startPostId = startPostId;
        return this;
    }

    public void setStartPostId(Integer startPostId) {
        this.startPostId = startPostId;
    }

    public ZonedDateTime getLastTime() {
        return lastTime;
    }

    public ScDiscussions lastTime(ZonedDateTime lastTime) {
        this.lastTime = lastTime;
        return this;
    }

    public void setLastTime(ZonedDateTime lastTime) {
        this.lastTime = lastTime;
    }

    public Integer getLastUserId() {
        return lastUserId;
    }

    public ScDiscussions lastUserId(Integer lastUserId) {
        this.lastUserId = lastUserId;
        return this;
    }

    public void setLastUserId(Integer lastUserId) {
        this.lastUserId = lastUserId;
    }

    public Integer getLastPostId() {
        return lastPostId;
    }

    public ScDiscussions lastPostId(Integer lastPostId) {
        this.lastPostId = lastPostId;
        return this;
    }

    public void setLastPostId(Integer lastPostId) {
        this.lastPostId = lastPostId;
    }

    public Integer getLastPostNumber() {
        return lastPostNumber;
    }

    public ScDiscussions lastPostNumber(Integer lastPostNumber) {
        this.lastPostNumber = lastPostNumber;
        return this;
    }

    public void setLastPostNumber(Integer lastPostNumber) {
        this.lastPostNumber = lastPostNumber;
    }

    public ZonedDateTime getHideTime() {
        return hideTime;
    }

    public ScDiscussions hideTime(ZonedDateTime hideTime) {
        this.hideTime = hideTime;
        return this;
    }

    public void setHideTime(ZonedDateTime hideTime) {
        this.hideTime = hideTime;
    }

    public Integer getHideUserId() {
        return hideUserId;
    }

    public ScDiscussions hideUserId(Integer hideUserId) {
        this.hideUserId = hideUserId;
        return this;
    }

    public void setHideUserId(Integer hideUserId) {
        this.hideUserId = hideUserId;
    }

    public Integer getIsApproved() {
        return isApproved;
    }

    public ScDiscussions isApproved(Integer isApproved) {
        this.isApproved = isApproved;
        return this;
    }

    public void setIsApproved(Integer isApproved) {
        this.isApproved = isApproved;
    }

    public Integer getIsLocked() {
        return isLocked;
    }

    public ScDiscussions isLocked(Integer isLocked) {
        this.isLocked = isLocked;
        return this;
    }

    public void setIsLocked(Integer isLocked) {
        this.isLocked = isLocked;
    }

    public Integer getIsSticky() {
        return isSticky;
    }

    public ScDiscussions isSticky(Integer isSticky) {
        this.isSticky = isSticky;
        return this;
    }

    public void setIsSticky(Integer isSticky) {
        this.isSticky = isSticky;
    }

    public Set<ScUsersDiscussions> getScUsersDiscussions() {
        return scUsersDiscussions;
    }

    public ScDiscussions scUsersDiscussions(Set<ScUsersDiscussions> scUsersDiscussions) {
        this.scUsersDiscussions = scUsersDiscussions;
        return this;
    }

    public ScDiscussions addScUsersDiscussions(ScUsersDiscussions scUsersDiscussions) {
        this.scUsersDiscussions.add(scUsersDiscussions);
        scUsersDiscussions.setScDiscussions(this);
        return this;
    }

    public ScDiscussions removeScUsersDiscussions(ScUsersDiscussions scUsersDiscussions) {
        this.scUsersDiscussions.remove(scUsersDiscussions);
        scUsersDiscussions.setScDiscussions(null);
        return this;
    }

    public void setScUsersDiscussions(Set<ScUsersDiscussions> scUsersDiscussions) {
        this.scUsersDiscussions = scUsersDiscussions;
    }

    public Set<ScPosts> getScPosts() {
        return scPosts;
    }

    public ScDiscussions scPosts(Set<ScPosts> scPosts) {
        this.scPosts = scPosts;
        return this;
    }

    public ScDiscussions addScPosts(ScPosts scPosts) {
        this.scPosts.add(scPosts);
        scPosts.setScDiscussions(this);
        return this;
    }

    public ScDiscussions removeScPosts(ScPosts scPosts) {
        this.scPosts.remove(scPosts);
        scPosts.setScDiscussions(null);
        return this;
    }

    public void setScPosts(Set<ScPosts> scPosts) {
        this.scPosts = scPosts;
    }

    public Set<ScTags> getScTags() {
        return scTags;
    }

    public ScDiscussions scTags(Set<ScTags> scTags) {
        this.scTags = scTags;
        return this;
    }

    public ScDiscussions addScTags(ScTags scTags) {
        this.scTags.add(scTags);
        scTags.getScDiscussions().add(this);
        return this;
    }

    public ScDiscussions removeScTags(ScTags scTags) {
        this.scTags.remove(scTags);
        scTags.getScDiscussions().remove(this);
        return this;
    }

    public void setScTags(Set<ScTags> scTags) {
        this.scTags = scTags;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ScDiscussions scDiscussions = (ScDiscussions) o;
        if (scDiscussions.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, scDiscussions.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ScDiscussions{" +
            "id=" + id +
            ", title='" + title + "'" +
            ", commentsCount='" + commentsCount + "'" +
            ", participantsCount='" + participantsCount + "'" +
            ", numberIndex='" + numberIndex + "'" +
            ", startTime='" + startTime + "'" +
            ", startUserId='" + startUserId + "'" +
            ", startPostId='" + startPostId + "'" +
            ", lastTime='" + lastTime + "'" +
            ", lastUserId='" + lastUserId + "'" +
            ", lastPostId='" + lastPostId + "'" +
            ", lastPostNumber='" + lastPostNumber + "'" +
            ", hideTime='" + hideTime + "'" +
            ", hideUserId='" + hideUserId + "'" +
            ", isApproved='" + isApproved + "'" +
            ", isLocked='" + isLocked + "'" +
            ", isSticky='" + isSticky + "'" +
            '}';
    }
}
