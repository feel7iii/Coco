package com.atom.coco.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ScPosts.
 */
@Entity
@Table(name = "sc_posts")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "scposts")
public class ScPosts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_number")
    private Integer number;

    @Column(name = "jhi_time")
    private ZonedDateTime time;

    @Column(name = "jhi_type")
    private String type;

    @Lob
    @Column(name = "content")
    private byte[] content;

    @Column(name = "content_content_type")
    private String contentContentType;

    @Column(name = "edit_time")
    private ZonedDateTime editTime;

    @Column(name = "edit_user_id")
    private Integer editUserId;

    @Column(name = "hide_time")
    private ZonedDateTime hideTime;

    @Column(name = "hide_user_id")
    private Integer hideUserId;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "is_approved")
    private Integer isApproved;

    @Column(name = "is_spam")
    private Integer isSpam;

    @OneToMany(mappedBy = "scPosts")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ScFlags> scFlags = new HashSet<>();

    @OneToMany(mappedBy = "scPosts")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ScPostsMentions> scPostsMentions = new HashSet<>();

    @ManyToOne
    private User user;

    @ManyToOne
    private ScDiscussions scDiscussions;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public ScPosts number(Integer number) {
        this.number = number;
        return this;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public ScPosts time(ZonedDateTime time) {
        this.time = time;
        return this;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public String getType() {
        return type;
    }

    public ScPosts type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getContent() {
        return content;
    }

    public ScPosts content(byte[] content) {
        this.content = content;
        return this;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public String getContentContentType() {
        return contentContentType;
    }

    public ScPosts contentContentType(String contentContentType) {
        this.contentContentType = contentContentType;
        return this;
    }

    public void setContentContentType(String contentContentType) {
        this.contentContentType = contentContentType;
    }

    public ZonedDateTime getEditTime() {
        return editTime;
    }

    public ScPosts editTime(ZonedDateTime editTime) {
        this.editTime = editTime;
        return this;
    }

    public void setEditTime(ZonedDateTime editTime) {
        this.editTime = editTime;
    }

    public Integer getEditUserId() {
        return editUserId;
    }

    public ScPosts editUserId(Integer editUserId) {
        this.editUserId = editUserId;
        return this;
    }

    public void setEditUserId(Integer editUserId) {
        this.editUserId = editUserId;
    }

    public ZonedDateTime getHideTime() {
        return hideTime;
    }

    public ScPosts hideTime(ZonedDateTime hideTime) {
        this.hideTime = hideTime;
        return this;
    }

    public void setHideTime(ZonedDateTime hideTime) {
        this.hideTime = hideTime;
    }

    public Integer getHideUserId() {
        return hideUserId;
    }

    public ScPosts hideUserId(Integer hideUserId) {
        this.hideUserId = hideUserId;
        return this;
    }

    public void setHideUserId(Integer hideUserId) {
        this.hideUserId = hideUserId;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public ScPosts ipAddress(String ipAddress) {
        this.ipAddress = ipAddress;
        return this;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Integer getIsApproved() {
        return isApproved;
    }

    public ScPosts isApproved(Integer isApproved) {
        this.isApproved = isApproved;
        return this;
    }

    public void setIsApproved(Integer isApproved) {
        this.isApproved = isApproved;
    }

    public Integer getIsSpam() {
        return isSpam;
    }

    public ScPosts isSpam(Integer isSpam) {
        this.isSpam = isSpam;
        return this;
    }

    public void setIsSpam(Integer isSpam) {
        this.isSpam = isSpam;
    }

    public Set<ScFlags> getScFlags() {
        return scFlags;
    }

    public ScPosts scFlags(Set<ScFlags> scFlags) {
        this.scFlags = scFlags;
        return this;
    }

    public ScPosts addScFlags(ScFlags scFlags) {
        this.scFlags.add(scFlags);
        scFlags.setScPosts(this);
        return this;
    }

    public ScPosts removeScFlags(ScFlags scFlags) {
        this.scFlags.remove(scFlags);
        scFlags.setScPosts(null);
        return this;
    }

    public void setScFlags(Set<ScFlags> scFlags) {
        this.scFlags = scFlags;
    }

    public Set<ScPostsMentions> getScPostsMentions() {
        return scPostsMentions;
    }

    public ScPosts scPostsMentions(Set<ScPostsMentions> scPostsMentions) {
        this.scPostsMentions = scPostsMentions;
        return this;
    }

    public ScPosts addScPostsMentions(ScPostsMentions scPostsMentions) {
        this.scPostsMentions.add(scPostsMentions);
        scPostsMentions.setScPosts(this);
        return this;
    }

    public ScPosts removeScPostsMentions(ScPostsMentions scPostsMentions) {
        this.scPostsMentions.remove(scPostsMentions);
        scPostsMentions.setScPosts(null);
        return this;
    }

    public void setScPostsMentions(Set<ScPostsMentions> scPostsMentions) {
        this.scPostsMentions = scPostsMentions;
    }

    public User getUser() {
        return user;
    }

    public ScPosts user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ScDiscussions getScDiscussions() {
        return scDiscussions;
    }

    public ScPosts scDiscussions(ScDiscussions scDiscussions) {
        this.scDiscussions = scDiscussions;
        return this;
    }

    public void setScDiscussions(ScDiscussions scDiscussions) {
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
        ScPosts scPosts = (ScPosts) o;
        if (scPosts.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, scPosts.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ScPosts{" +
            "id=" + id +
            ", number='" + number + "'" +
            ", time='" + time + "'" +
            ", type='" + type + "'" +
            ", content='" + content + "'" +
            ", contentContentType='" + contentContentType + "'" +
            ", editTime='" + editTime + "'" +
            ", editUserId='" + editUserId + "'" +
            ", hideTime='" + hideTime + "'" +
            ", hideUserId='" + hideUserId + "'" +
            ", ipAddress='" + ipAddress + "'" +
            ", isApproved='" + isApproved + "'" +
            ", isSpam='" + isSpam + "'" +
            '}';
    }
}
