package com.proiectdepractica.backend.controller;

import com.proiectdepractica.backend.entity.*;
import com.proiectdepractica.backend.exception.ResourceNotFoundException;
import com.proiectdepractica.backend.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class DatabaseController {

    private CarRepository carRepository;
    private CommandRepository commandRepository;
    private ReviewRepository reviewRepository;
    private RoleRepository roleRepository;
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    public DatabaseController(CarRepository carRepository, CommandRepository commandRepository, ReviewRepository reviewRepository, RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.carRepository = carRepository;
        this.commandRepository = commandRepository;
        this.reviewRepository = reviewRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/api/support/database/car")
    public ResponseEntity<String> supportDatabaseCar() {
        //        update review for car
        List<Car> cars = carRepository.findAll();
        cars.stream().map(car -> {
            List<Review> foundReviews = reviewRepository.findAllById_car(car.getId());
            car.getReviews().clear();
            car.getReviews().addAll(new HashSet<>(foundReviews));
            return carRepository.save(car);
        }).collect(Collectors.toList());
        return new ResponseEntity<>("Car updated.", HttpStatus.OK);
    }

    @GetMapping("/api/support/database/command")
    public ResponseEntity<String> supportDatabaseCommand() {
        List<Command> commands = commandRepository.findAll();
        //        update car, user for command
        commands.stream().map(command -> {
            Car car = carRepository.findById(command.getId_car()).orElseThrow(() -> new ResourceNotFoundException("Car", "id", command.getId_car()));
            User user = userRepository.findById(command.getId_user()).orElseThrow(() -> new ResourceNotFoundException("Car", "id", command.getId_user()));
            command.setCar(car);
            command.setUser(user);
            return commandRepository.save(command);
        }).collect(Collectors.toList());
        return new ResponseEntity<>("Command updated.", HttpStatus.OK);
    }

    @GetMapping("/api/support/database/review")
    public ResponseEntity<String> supportDatabaseReview() {
        List<Review> reviews = reviewRepository.findAll();
//        update car, user for review
        reviews.stream().map(review -> {
            Car car = carRepository.findById(review.getId_car()).orElseThrow(() -> new ResourceNotFoundException("Car", "id", review.getId_car()));
            User user = userRepository.findById(review.getId_user()).orElseThrow(() -> new ResourceNotFoundException("Car", "id", review.getId_user()));
            review.setCar(car);
            review.setUser(user);
            return reviewRepository.save(review);
        }).collect(Collectors.toList());
        return new ResponseEntity<>("Review updated.", HttpStatus.OK);
    }

    @GetMapping("/api/support/database/user")
    public ResponseEntity<String> supportDatabaseUser() {
        List<User> users = userRepository.findAll();
        //        update commands, password, wishlist, review for user
        users.stream().map(user -> {

//            commands complete and commands on process
            List<Command> completedCommands = commandRepository.findByCompletedTrueAndId_user(user.getId());
            List<Command> onProcessCommands = commandRepository.findByCompletedTFalseAndId_user(user.getId());
            user.getCompletedCommands().clear();
            user.getCompletedCommands().addAll(new HashSet<>(completedCommands));
            user.getOnProcessCommands().clear();
            user.getOnProcessCommands().addAll(new HashSet<>(onProcessCommands));

//            wishlist
            List<Car> carFromCompletedCommands = completedCommands.stream().map(Command::getCar).toList();
            List<Car> carFromOnProcessCommands = onProcessCommands.stream().map(Command::getCar).toList();
            user.getWishListCars().clear();
            user.getWishListCars().addAll(new HashSet<>(carFromCompletedCommands));
            user.getWishListCars().addAll(new HashSet<>(carFromOnProcessCommands));

//            password
            user.setPassword(passwordEncoder.encode(user.getUsername()));

//            review
            List<Review> foundReviews = reviewRepository.findAllById_user(user.getId());
            user.getReviews().clear();
            user.getReviews().addAll(new HashSet<>(foundReviews));
            return userRepository.save(user);
        }).collect(Collectors.toList());

        return new ResponseEntity<>("User updated.", HttpStatus.OK);
    }

    @GetMapping("/api/support/database/user/role")
    public ResponseEntity<String> supportDatabaseUserRole() {
        List<User> users = userRepository.findAll();
        users.stream().map(user -> {
            Role role = roleRepository.findById(1L).orElseThrow(() -> new ResourceNotFoundException("Role", "id", 1L));
            user.getRoles().clear();
            user.getRoles().add(role);
            userRepository.save(user);
            return user;
        }).collect(Collectors.toList());
        return new ResponseEntity<>("User's role updated.", HttpStatus.OK);
    }

    @GetMapping("/api/support/database/user/createAdmin")
    public ResponseEntity<String> supportDatabaseCreateAdmin() {
        User user = userRepository.findById(1L).orElseThrow(() -> new ResourceNotFoundException("User", "id", 1L));
        user.setName("admin");
        user.setUsername("admin");
        user.setPassword(passwordEncoder.encode("admin"));
        List<Role> roles = roleRepository.findAll();
        user.setRoles(new HashSet<>(roles));
        userRepository.save(user);
        return new ResponseEntity<>("Admin created.", HttpStatus.OK);
    }
}
