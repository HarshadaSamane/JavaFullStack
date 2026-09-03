package com.harshu.traveldiary.repository;

import com.harshu.traveldiary.entity.TravelPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TravelPostRepository extends JpaRepository<TravelPost, Long> {

    List<TravelPost> findByUserId(Long id);

    List<TravelPost> findByLocation(String location);
}
