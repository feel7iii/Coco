package com.atom.coco.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A ScMessagings.
 */
@Entity
@Table(name = "sc_messagings")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "scmessagings")
public class ScMessagings implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sender_id")
    private Integer senderId;

    @Column(name = "subject_type")
    private String subjectType;

    @Column(name = "subject_id")
    private Integer subjectId;

    @Lob
    @Column(name = "data")
    private byte[] data;

    @Column(name = "data_content_type")
    private String dataContentType;

    @Column(name = "jhi_time")
    private ZonedDateTime time;

    @Column(name = "is_read")
    private Integer isRead;

    @Column(name = "is_deleted")
    private Integer isDeleted;

    @ManyToOne
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSenderId() {
        return senderId;
    }

    public ScMessagings senderId(Integer senderId) {
        this.senderId = senderId;
        return this;
    }

    public void setSenderId(Integer senderId) {
        this.senderId = senderId;
    }

    public String getSubjectType() {
        return subjectType;
    }

    public ScMessagings subjectType(String subjectType) {
        this.subjectType = subjectType;
        return this;
    }

    public void setSubjectType(String subjectType) {
        this.subjectType = subjectType;
    }

    public Integer getSubjectId() {
        return subjectId;
    }

    public ScMessagings subjectId(Integer subjectId) {
        this.subjectId = subjectId;
        return this;
    }

    public void setSubjectId(Integer subjectId) {
        this.subjectId = subjectId;
    }

    public byte[] getData() {
        return data;
    }

    public ScMessagings data(byte[] data) {
        this.data = data;
        return this;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getDataContentType() {
        return dataContentType;
    }

    public ScMessagings dataContentType(String dataContentType) {
        this.dataContentType = dataContentType;
        return this;
    }

    public void setDataContentType(String dataContentType) {
        this.dataContentType = dataContentType;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public ScMessagings time(ZonedDateTime time) {
        this.time = time;
        return this;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public Integer getIsRead() {
        return isRead;
    }

    public ScMessagings isRead(Integer isRead) {
        this.isRead = isRead;
        return this;
    }

    public void setIsRead(Integer isRead) {
        this.isRead = isRead;
    }

    public Integer getIsDeleted() {
        return isDeleted;
    }

    public ScMessagings isDeleted(Integer isDeleted) {
        this.isDeleted = isDeleted;
        return this;
    }

    public void setIsDeleted(Integer isDeleted) {
        this.isDeleted = isDeleted;
    }

    public User getUser() {
        return user;
    }

    public ScMessagings user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ScMessagings scMessagings = (ScMessagings) o;
        if (scMessagings.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, scMessagings.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ScMessagings{" +
            "id=" + id +
            ", senderId='" + senderId + "'" +
            ", subjectType='" + subjectType + "'" +
            ", subjectId='" + subjectId + "'" +
            ", data='" + data + "'" +
            ", dataContentType='" + dataContentType + "'" +
            ", time='" + time + "'" +
            ", isRead='" + isRead + "'" +
            ", isDeleted='" + isDeleted + "'" +
            '}';
    }
}
