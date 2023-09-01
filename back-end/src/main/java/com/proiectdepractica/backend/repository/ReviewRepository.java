package com.proiectdepractica.backend.repository;

import com.proiectdepractica.backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(
            value = "SELECT * FROM reviews r WHERE r.id_car = ?1",
            nativeQuery = true)
    List<Review> findAllById_car(Long id);

    @Query(
            value = "SELECT * FROM reviews r WHERE r.id_user = ?1",
            nativeQuery = true)
    List<Review> findAllById_user(Long id);


}
