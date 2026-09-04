package com.harshu.traveldiary.controller;

import com.harshu.traveldiary.dto.TravelPostDto;
import com.harshu.traveldiary.entity.TravelPost;
import com.harshu.traveldiary.service.TravelPostService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class TravelPostController {

    private final TravelPostService travelPostService;

    public TravelPostController(TravelPostService travelPostService) {
        this.travelPostService = travelPostService;
    }

    //Create post
    @PostMapping
    public TravelPost createPost(@Valid @RequestBody TravelPostDto travelPostDto) {
        TravelPost travelPost = new TravelPost();

        travelPost.setTitle(travelPostDto.getTitle());
        travelPost.setDescription(travelPostDto.getDescription());
        travelPost.setLocation(travelPostDto.getLocation());

        return travelPostService.createPost(travelPost);
    }

    //Get All
    @GetMapping
    public List<TravelPost> getAllPosts() {
        return travelPostService.getAllPosts();
    }

    //GEt by ID
    @GetMapping("/{id}")
    public TravelPost getPostById(@PathVariable Long id) {
        return travelPostService.getPostById(id);
    }

    //Update Post
    @PutMapping("/{id}")
    public TravelPost updatePost(@PathVariable Long id, @RequestBody TravelPost updatedPost) {
        return travelPostService.updatePost(id, updatedPost);
    }

    //Delete Post
    @DeleteMapping("/{id}")
    public String deletePost(@PathVariable long id) {
        travelPostService.deletePost(id);

        return "Post deleted Successfully";
    }

    //Post for Specific User
    @PostMapping("/user/{userId}")
    public TravelPost createPostForUser(@PathVariable Long userId, @RequestBody TravelPost travelPost) {
        return travelPostService.createPostForUser(userId,travelPost);
    }

    //Find by User
    @GetMapping("/user/{userId}")
    public List<TravelPost> getPostsByUserId(@PathVariable Long userId) {
        return travelPostService.getPostsByUserId(userId);
    }

    //Find By location
    @GetMapping("/location/{location}")
    public List<TravelPost> getPostsByLocation(@PathVariable String location) {
        return travelPostService.getPostsByLocation(location);
    }

    //To post for current user
    @PostMapping("/current-user")
    public TravelPost createPostForCurrentUser(
            @RequestBody TravelPost travelPost,
            Authentication authentication) {

        return travelPostService.createPostForLoggedInUser(
                authentication.getName(),
                travelPost
        );
    }

    //To get own Post
    @GetMapping("/my-posts")
    public List<TravelPost> getMyPosts(
            Authentication authentication) {

        return travelPostService.getMyPosts(
                authentication.getName()
        );
    }

    @PutMapping("/{id}/like")
    public TravelPost likePost(@PathVariable Long id) {
        return travelPostService.likePost(id);
    }
}
