package com.nt.rookie.post.model;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "user")
public class SystemUser implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "birthdate")
    private Date birthDate;

    @Column(name = "joined_date")
    private Date joinedDate;

    @Column(name = "gender")
    private String gender;

    @Column(name = "type")
    private String type;

    @Column(name = "staff_code")
    private String staffCode;

    @ManyToOne
    @JoinColumn(name = "location_code")
    private Location location;

    @Column(name = "state")
    private int state;

    @OneToOne(mappedBy = "username", fetch = FetchType.EAGER)
    private Authority authority;

    @Column(name = "first_time")
    private int firstTime;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public Date getJoinedDate() {
        return joinedDate;
    }

    public String getGender() {
        return gender;
    }

    public String getType() {
        return type;
    }

    public String getStaffCode() {
        return staffCode;
    }

    public Location getLocation() {
        return location;
    }

    public int getState() {
        return state;
    }

    public Authority getAuthority() {
        return authority;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public void setJoinedDate(Date joinedDate) {
        this.joinedDate = joinedDate;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setStaffCode(String staffCode) {
        this.staffCode = staffCode;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public void setState(int state) {
        this.state = state;
    }

    public void setAuthority(Authority authority) {
        this.authority = authority;
    }

    public int getFirstTime() {
        return firstTime;
    }

    public void setFirstTime(int firstTime) {
        this.firstTime = firstTime;
    }

}
