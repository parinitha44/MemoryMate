package com.memorymate.backend.dto;

import com.memorymate.backend.model.User;

import java.util.Set;

public class AuthResponse {
    private String token;
    private String userId;
    private String fullName;
    private String email;
    private Set<User.Role> roles;

    public AuthResponse() {}

    public AuthResponse(String token, String userId, String fullName, String email, Set<User.Role> roles) {
        this.token = token;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.roles = roles;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<User.Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<User.Role> roles) {
        this.roles = roles;
    }
}
