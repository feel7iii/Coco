package com.atom.coco.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.atom.coco.domain.enumeration.ScSubscription;

/**
 * A ScUsersDiscussions.
 */
@Entity
@Table(name = "sc_users_discussions")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "scusersdiscussions")
public class ScUsersDiscussions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "read_time")
    private ZonedDateTime readTime;

    @Column(name = "read_number")
    private Integer readNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "sc_subscription")
    private ScSubscription scSubscription;

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

    public ZonedDateTime getReadTime() {
        return readTime;
    }

    public ScUsersDiscussions readTime(ZonedDateTime readTime) {
        this.readTime = readTime;
        return this;
    }

    public void setReadTime(ZonedDateTime readTime) {
        this.readTime = readTime;
    }

    public Integer getReadNumber() {
        return readNumber;
    }

    public ScUsersDiscussions readNumber(Integer readNumber) {
        this.readNumber = readNumber;
        return this;
    }

    public void setReadNumber(Integer readNumber) {
        this.readNumber = readNumber;
    }

    public ScSubscription getScSubscription() {
        return scSubscription;
    }

    public ScUsersDiscussions scSubscription(ScSubscription scSubscription) {
        this.scSubscription = scSubscription;
        return this;
    }

    public void setScSubscription(ScSubscription scSubscription) {
        this.scSubscription = scSubscription;
    }

    public User getUser() {
        return user;
    }

    public ScUsersDiscussions user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ScDiscussions getScDiscussions() {
        return scDiscussions;
    }

    public ScUsersDiscussions scDiscussions(ScDiscussions scDiscussions) {
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
        ScUsersDiscussions scUsersDiscussions = (ScUsersDiscussions) o;
        if (scUsersDiscussions.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, scUsersDiscussions.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ScUsersDiscussions{" +
            "id=" + id +
            ", readTime='" + readTime + "'" +
            ", readNumber='" + readNumber + "'" +
            ", scSubscription='" + scSubscription + "'" +
            '}';
    }
}
