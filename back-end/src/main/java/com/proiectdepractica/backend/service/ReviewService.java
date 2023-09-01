package com.proiectdepractica.backend.service;

import com.proiectdepractica.backend.payload.ReviewDto;

import java.util.List;
import java.util.Set;

public interface ReviewService {
    ReviewDto createReview(ReviewDto reviewDto);

    List<ReviewDto> getAllReviews(int pageNo, int pageSize, String sortBy, String sortDir);

    ReviewDto getReviewById(Long id);

    ReviewDto updateReview(ReviewDto reviewDto, Long id);

    void deleteReviewById(Long id);

    List<ReviewDto> getAllReviewsByCarId(Long carId);
}
