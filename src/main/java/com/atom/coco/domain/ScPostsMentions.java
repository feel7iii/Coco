package com.atom.coco.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A ScPostsMentions.
 */
@Entity
@Table(name = "sc_posts_mentions")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "scpostsmentions")
public class ScPostsMentions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sender_id")
    private Integer senderId;

    @Lob
    @Column(name = "data")
    private byte[] data;

    @Column(name = "data_content_type")
    private String dataContentType;

    @Column(name = "jhi_time")
    private ZonedDateTime time;

    @Column(name = "is_read")
    private Integer isRead;

    @ManyToOne
    private User user;

    @ManyToOne
    private ScPosts scPosts;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSenderId() {
        return senderId;
    }

    public ScPostsMentions senderId(Integer senderId) {
        this.senderId = senderId;
        return this;
    }

    public void setSenderId(Integer senderId) {
        this.senderId = senderId;
    }

    public byte[] getData() {
        return data;
    }

    public ScPostsMentions data(byte[] data) {
        this.data = data;
        return this;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getDataContentType() {
        return dataContentType;
    }

    public ScPostsMentions dataContentType(String dataContentType) {
        this.dataContentType = dataContentType;
        return this;
    }

    public void setDataContentType(String dataContentType) {
        this.dataContentType = dataContentType;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public ScPostsMentions time(ZonedDateTime time) {
        this.time = time;
        return this;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public Integer getIsRead() {
        return isRead;
    }

    public ScPostsMentions isRead(Integer isRead) {
        this.isRead = isRead;
        return this;
    }

    public void setIsRead(Integer isRead) {
        this.isRead = isRead;
    }

    public User getUser() {
        return user;
    }

    public ScPostsMentions user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ScPosts getScPosts() {
        return scPosts;
    }

    public ScPostsMentions scPosts(ScPosts scPosts) {
        this.scPosts = scPosts;
        return this;
    }

    public void setScPosts(ScPosts scPosts) {
        this.scPosts = scPosts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ScPostsMentions scPostsMentions = (ScPostsMentions) o;
        if (scPostsMentions.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, scPostsMentions.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ScPostsMentions{" +
            "id=" + id +
            ", senderId='" + senderId + "'" +
            ", data='" + data + "'" +
            ", dataContentType='" + dataContentType + "'" +
            ", time='" + time + "'" +
            ", isRead='" + isRead + "'" +
            '}';
    }
}
