package com.boolsazo.bankchall.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "user")
@Getter
@Setter
public class User {

    @Id
    private Long userId;
    private String id;
    private String name;
    private String email;
    private String gender;
    private String birthyear;
    private String age;
    private String profileImage;
    private String financialType;

    public User() {
    }

    public User(String id) {
        this.id = id;
    }

    public User(String name, String email, String gender, String birthyear, String age,
        String profileImage) {
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.birthyear = birthyear;
        this.age = age;
        this.profileImage = profileImage;
    }

}