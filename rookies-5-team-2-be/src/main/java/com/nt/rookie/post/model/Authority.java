package com.nt.rookie.post.model;


import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "authority")
public class Authority implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "authority_id")
    private int id;
    @Column(name = "authority")
    private String authority;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "username")
    private SystemUser username;

    public Authority() {
        super();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public SystemUser getUsername() {
        return username;
    }

    public void setUsername(SystemUser username) {
        this.username = username;
    }

    public Authority(int id, String authority, SystemUser username) {
        this.id = id;
        this.authority = authority;
        this.username = username;
    }
}
