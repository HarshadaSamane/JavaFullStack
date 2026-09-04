package com.harshu.traveldiary.service;

import com.harshu.traveldiary.entity.TravelPost;
import com.harshu.traveldiary.entity.User;
import com.harshu.traveldiary.repository.TravelPostRepository;
import com.harshu.traveldiary.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TravelPostService {

    private final TravelPostRepository travelPostRepository ;
    private final UserRepository userRepository;

    public TravelPostService(TravelPostRepository travelPostRepository, UserRepository userRepository) {
        this.travelPostRepository = travelPostRepository;
        this.userRepository = userRepository;
    }

    //Create Post
    public TravelPost createPost(TravelPost travelPost) {
        return travelPostRepository.save(travelPost);
    }

    //Get All Posts
    public List<TravelPost> getAllPosts() {
        return travelPostRepository.findAll();
    }

    public TravelPost createPostForUser(Long userId, TravelPost travelPost) {
        User user = userRepository.findById(userId).orElse(null);

        travelPost.setUser(user);

        return travelPostRepository.save(travelPost);
    }


    //Get post by ID
    public TravelPost getPostById(Long id) {
        return travelPostRepository.findById(id).orElse(null);
    }

    //Update Post
    public TravelPost updatePost(Long id, TravelPost updatedPost) {
        TravelPost post = travelPostRepository.findById(id).orElse(null);

        if(post != null) {
            post.setTitle(updatedPost.getTitle());
            post.setDescription(updatedPost.getDescription());
            post.setLocation(updatedPost.getLocation());

            return travelPostRepository.save(post);
        }
        return null;
    }

    //Delete Post
    public void deletePost(Long id) {
        travelPostRepository.deleteById(id);
    }

    //Find By User
    public List<TravelPost> getPostsByUserId(Long userId) {
        return travelPostRepository.findByUserId(userId);
    }

    //Find By location
    public List<TravelPost> getPostsByLocation(String location) {
        return travelPostRepository.findByLocationContainingIgnoreCase(location);
    }

    //For logged In User
    public TravelPost createPostForLoggedInUser(
            String email,
            TravelPost travelPost) {

        User user = userRepository.findByEmail(email);

        travelPost.setUser(user);

        return travelPostRepository.save(travelPost);
    }

    //To get own posts
    public List<TravelPost> getMyPosts(String email) {

        User user = userRepository.findByEmail(email);

        return travelPostRepository.findByUserId(user.getId());
    }

    //Likes
    public TravelPost likePost(Long id) {
        TravelPost post = travelPostRepository.findById(id).orElse(null);

        if(post != null) {
            post.setLikes(post.getLikes()+1);

            return travelPostRepository.save(post);
        }

        return null;
    }
}
