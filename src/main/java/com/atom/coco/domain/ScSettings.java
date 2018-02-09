package com.atom.coco.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ScSettings.
 */
@Entity
@Table(name = "sc_settings")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "scsettings")
public class ScSettings implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_key")
    private String key;

    @Lob
    @Column(name = "jhi_value")
    private byte[] value;

    @Column(name = "jhi_value_content_type")
    private String valueContentType;

    @ManyToOne
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public ScSettings key(String key) {
        this.key = key;
        return this;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public byte[] getValue() {
        return value;
    }

    public ScSettings value(byte[] value) {
        this.value = value;
        return this;
    }

    public void setValue(byte[] value) {
        this.value = value;
    }

    public String getValueContentType() {
        return valueContentType;
    }

    public ScSettings valueContentType(String valueContentType) {
        this.valueContentType = valueContentType;
        return this;
    }

    public void setValueContentType(String valueContentType) {
        this.valueContentType = valueContentType;
    }

    public User getUser() {
        return user;
    }

    public ScSettings user(User user) {
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
        ScSettings scSettings = (ScSettings) o;
        if (scSettings.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, scSettings.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ScSettings{" +
            "id=" + id +
            ", key='" + key + "'" +
            ", value='" + value + "'" +
            ", valueContentType='" + valueContentType + "'" +
            '}';
    }
}
