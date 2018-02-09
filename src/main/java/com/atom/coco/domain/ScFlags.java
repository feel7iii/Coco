package com.atom.coco.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A ScFlags.
 */
@Entity
@Table(name = "sc_flags")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "scflags")
public class ScFlags implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_type")
    private String type;

    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "reason", length = 64, nullable = false)
    private String reason;

    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "reason_detail", length = 64, nullable = false)
    private String reasonDetail;

    @Column(name = "jhi_time")
    private ZonedDateTime time;

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

    public String getType() {
        return type;
    }

    public ScFlags type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getReason() {
        return reason;
    }

    public ScFlags reason(String reason) {
        this.reason = reason;
        return this;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getReasonDetail() {
        return reasonDetail;
    }

    public ScFlags reasonDetail(String reasonDetail) {
        this.reasonDetail = reasonDetail;
        return this;
    }

    public void setReasonDetail(String reasonDetail) {
        this.reasonDetail = reasonDetail;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public ScFlags time(ZonedDateTime time) {
        this.time = time;
        return this;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public User getUser() {
        return user;
    }

    public ScFlags user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ScPosts getScPosts() {
        return scPosts;
    }

    public ScFlags scPosts(ScPosts scPosts) {
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
        ScFlags scFlags = (ScFlags) o;
        if (scFlags.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, scFlags.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ScFlags{" +
            "id=" + id +
            ", type='" + type + "'" +
            ", reason='" + reason + "'" +
            ", reasonDetail='" + reasonDetail + "'" +
            ", time='" + time + "'" +
            '}';
    }
}
