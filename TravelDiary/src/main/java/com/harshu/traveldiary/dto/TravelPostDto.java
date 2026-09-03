package com.harshu.traveldiary.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TravelPostDto {

    @NotBlank(message = "Title cannot be empty")
    private String title;

    @NotBlank(message = "Description cannot be empty")
    private String description;

    @NotBlank(message = "Location cannot be empty")
    private String location;
}
