package com.nt.rookie.post.model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Assignment {
    @Id
    @Column(name = "id")
    private int id;

    @OneToOne
    @JoinColumn(name = "assigned_to")
    private SystemUser assignedTo;

    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "asset_code")
    private Asset asset;

    @Column(name = "assigned_date")
    private Date assignedDate;

    @Column(name = "state")
    private int state;

    @Column(name = "note")
    private String note;

    @Column(name = "return_date")
    private Date returnDate;

    @OneToOne
    @JoinColumn(name = "assigned_by")
    private SystemUser assignedBy;

    @OneToOne
    @JoinColumn(name = "accepted_by")
    private SystemUser acceptedBy;

    @OneToOne
    @JoinColumn(name = "requested_by")
    private SystemUser requestedBy;

    public SystemUser getRequestedBy() {
        return requestedBy;
    }

    public void setRequestedBy(SystemUser requestedBy) {
        this.requestedBy = requestedBy;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public SystemUser getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(SystemUser assignedTo) {
        this.assignedTo = assignedTo;
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public Date getAssignedDate() {
        return assignedDate;
    }

    public void setAssignedDate(Date assignedDate) {
        this.assignedDate = assignedDate;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public SystemUser getAssignedBy() {
        return assignedBy;
    }

    public void setAssignedBy(SystemUser assignedBy) {
        this.assignedBy = assignedBy;
    }

    public SystemUser getAcceptedBy() {
        return acceptedBy;
    }

    public void setAcceptedBy(SystemUser acceptedBy) {
        this.acceptedBy = acceptedBy;
    }
}
