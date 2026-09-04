package com.harshu.traveldiary.dto;
import lombok.Data;

@Data
public class TravelPostResponse {

    private Long id;
    private String title;
    private String description;
    private String location;
    private int likes;
    private String userName;
}
