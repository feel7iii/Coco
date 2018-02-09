package com.atom.coco.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ScGroups.
 */
@Entity
@Table(name = "sc_groups")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "scgroups")
public class ScGroups implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_singular")
    private String nameSingular;

    @Column(name = "name_plural")
    private String namePlural;

    @Column(name = "color")
    private String color;

    @Column(name = "icon")
    private String icon;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "sc_groups_user",
               joinColumns = @JoinColumn(name="sc_groups_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="users_id", referencedColumnName="id"))
    private Set<User> users = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameSingular() {
        return nameSingular;
    }

    public ScGroups nameSingular(String nameSingular) {
        this.nameSingular = nameSingular;
        return this;
    }

    public void setNameSingular(String nameSingular) {
        this.nameSingular = nameSingular;
    }

    public String getNamePlural() {
        return namePlural;
    }

    public ScGroups namePlural(String namePlural) {
        this.namePlural = namePlural;
        return this;
    }

    public void setNamePlural(String namePlural) {
        this.namePlural = namePlural;
    }

    public String getColor() {
        return color;
    }

    public ScGroups color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getIcon() {
        return icon;
    }

    public ScGroups icon(String icon) {
        this.icon = icon;
        return this;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Set<User> getUsers() {
        return users;
    }

    public ScGroups users(Set<User> users) {
        this.users = users;
        return this;
    }

    public ScGroups addUser(User user) {
        this.users.add(user);
        return this;
    }

    public ScGroups removeUser(User user) {
        this.users.remove(user);
        return this;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ScGroups scGroups = (ScGroups) o;
        if (scGroups.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, scGroups.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ScGroups{" +
            "id=" + id +
            ", nameSingular='" + nameSingular + "'" +
            ", namePlural='" + namePlural + "'" +
            ", color='" + color + "'" +
            ", icon='" + icon + "'" +
            '}';
    }
}
