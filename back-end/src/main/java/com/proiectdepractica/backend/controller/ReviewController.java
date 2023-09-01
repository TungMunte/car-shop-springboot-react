package com.proiectdepractica.backend.controller;

import com.proiectdepractica.backend.payload.ReviewDto;
import com.proiectdepractica.backend.service.ReviewService;
import com.proiectdepractica.backend.utils.AppConstants;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ReviewController {

    private ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/api/reviews")
    public ResponseEntity<ReviewDto> addReview(@Valid @RequestBody ReviewDto reviewDto) {
        return new ResponseEntity<>(reviewService.createReview(reviewDto), HttpStatus.CREATED);
    }

    @GetMapping("/api/reviews")
    public ResponseEntity<List<ReviewDto>> getAllReviews(@RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo, @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize, @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy, @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir) {
        return new ResponseEntity<>(reviewService.getAllReviews(pageNo, pageSize, sortBy, sortDir), HttpStatus.OK);
    }

    @GetMapping("/api/reviews/{id}")
    public ResponseEntity<ReviewDto> getReviewById(@PathVariable long id) {
        return new ResponseEntity<>(reviewService.getReviewById(id), HttpStatus.OK);
    }

    @PutMapping("/api/reviews/{id}")
    public ResponseEntity<ReviewDto> updateReview(@Valid @RequestBody ReviewDto reviewDto, @PathVariable long id) {
        return new ResponseEntity<>(reviewService.updateReview(reviewDto, id), HttpStatus.OK);
    }

    @DeleteMapping("/api/reviews/{id}")
    public ResponseEntity<String> deleteReviewById(@PathVariable long id) {
        reviewService.deleteReviewById(id);
        return new ResponseEntity<>("Car entity deleted successfully.", HttpStatus.OK);
    }

    @GetMapping("/api/reviews/car/{id}")
    public ResponseEntity<List<ReviewDto>> getAllReviewsByCarId(@PathVariable long id) {
        return new ResponseEntity<>(reviewService.getAllReviewsByCarId(id), HttpStatus.OK);
    }
}
