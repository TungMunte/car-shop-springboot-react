package com.proiectdepractica.backend.service.impl;

import com.proiectdepractica.backend.entity.Car;
import com.proiectdepractica.backend.entity.Review;
import com.proiectdepractica.backend.entity.User;
import com.proiectdepractica.backend.exception.ResourceNotFoundException;
import com.proiectdepractica.backend.payload.ReviewDto;
import com.proiectdepractica.backend.payload.UserDto;
import com.proiectdepractica.backend.repository.CarRepository;
import com.proiectdepractica.backend.repository.ReviewRepository;
import com.proiectdepractica.backend.repository.UserRepository;
import com.proiectdepractica.backend.service.ReviewService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    private ReviewRepository reviewRepository;
    private UserRepository userRepository;
    private CarRepository carRepository;
    private ModelMapper mapper;

    public ReviewServiceImpl(ReviewRepository reviewRepository, UserRepository userRepository, CarRepository carRepository, ModelMapper mapper) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.mapper = mapper;
    }

    @Override
    public ReviewDto createReview(ReviewDto reviewDto) {
        Review review = mapper.map(reviewDto, Review.class);
        User user = userRepository.findByUsername(reviewDto.getUsername()).orElseThrow(() -> new ResourceNotFoundException("Review", "username", reviewDto.getId()));
        Car car = carRepository.findById(reviewDto.getId_car()).orElseThrow(() -> new ResourceNotFoundException("Review", "id_user", reviewDto.getId_car()));
        review.setCar(car);
        review.setUser(user);
        review.setId_user(user.getId());
        Review savedReview = reviewRepository.save(review);
        ReviewDto responseReview = mapper.map(savedReview, ReviewDto.class);
        return responseReview;
    }

    @Override
    public List<ReviewDto> getAllReviews(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Review> reviews = reviewRepository.findAll(pageable);
        List<Review> reviewList = reviews.getContent();
        List<ReviewDto> reviewDtoList = reviewList.stream().map(review -> mapper.map(review, ReviewDto.class)).collect(Collectors.toList());
        return reviewDtoList;
    }

    @Override
    public ReviewDto getReviewById(Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Review", "id", id));
        ReviewDto responseReview = mapper.map(review, ReviewDto.class);
        return responseReview;
    }

    @Override
    public ReviewDto updateReview(ReviewDto reviewDto, Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Review", "id", id));
        review.setContent(reviewDto.getContent());
        review.setRating(reviewDto.getRating());
        Review updatedReview = reviewRepository.save(review);
        ReviewDto responseReview = mapper.map(updatedReview, ReviewDto.class);
        return responseReview;
    }

    @Override
    public void deleteReviewById(Long id) {
        reviewRepository.deleteById(id);
    }

    @Override
    public List<ReviewDto> getAllReviewsByCarId(Long carId) {
        List<Review> reviews = reviewRepository.findAllById_car(carId);
        List<ReviewDto> responseReview = reviews.stream().map(review -> {
            User user = userRepository.findById(review.getId_user()).orElseThrow(() -> new ResourceNotFoundException("Review", "id_user", review.getId_user()));
            UserDto userDto = mapper.map(user, UserDto.class);
            ReviewDto reviewDto = mapper.map(review, ReviewDto.class);
            reviewDto.setUsername(userDto.getUsername());
            return reviewDto;
        }).toList();
        return responseReview;
    }
}
