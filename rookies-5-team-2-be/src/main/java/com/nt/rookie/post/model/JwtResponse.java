package com.nt.rookie.post.model;

import java.io.Serializable;

public class JwtResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private String jwttoken;

    public JwtResponse(String jwttoken) {
        setJwttoken(jwttoken);
    }

    public String getJwttoken() {
        return jwttoken;
    }

    public String authority;
    public int firstTime;

    public String locationCode;

    public JwtResponse(String jwttoken, String authority, int firstTime, String locationCode) {
        this.jwttoken = jwttoken;
        this.authority = authority;
        this.firstTime = firstTime;
        this.locationCode = locationCode;
    }

    public JwtResponse(String jwttoken, String authority, int firstTime) {
        this.jwttoken = jwttoken;
        this.authority = authority;
        this.firstTime = firstTime;
    }

    public JwtResponse(String jwttoken, String authority) {
        this.jwttoken = jwttoken;
        this.authority = authority;
    }

    public void setJwttoken(String jwttoken) {
        this.jwttoken = jwttoken;
    }

}
