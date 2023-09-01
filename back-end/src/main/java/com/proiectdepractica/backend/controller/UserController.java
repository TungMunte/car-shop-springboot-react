package com.proiectdepractica.backend.controller;

import com.proiectdepractica.backend.entity.User;
import com.proiectdepractica.backend.payload.CarDto;
import com.proiectdepractica.backend.payload.CommandDto;
import com.proiectdepractica.backend.payload.UserDto;
import com.proiectdepractica.backend.payload.UserUpdateDto;
import com.proiectdepractica.backend.service.UserService;
import com.proiectdepractica.backend.utils.AppConstants;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<UserDto>> getAllUsers(@RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo, @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize, @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy, @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir) {
        return new ResponseEntity<>(userService.getAllUsers(pageNo, pageSize, sortBy, sortDir), HttpStatus.OK);
    }

    @GetMapping("/api/users/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @GetMapping("/api/users/username/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable String username) {
        return new ResponseEntity<>(userService.getUserByUsername(username), HttpStatus.OK);
    }

    @PutMapping("/api/users/update/username/{username}")
    public ResponseEntity<UserUpdateDto> updateUserByUsername(@Valid @RequestBody UserUpdateDto userUpdateDto, @PathVariable String username) {
        return new ResponseEntity<>(userService.updateUserByUsername(userUpdateDto, username), HttpStatus.OK);
    }

    @PutMapping("/api/users/{id}")
    public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto userDto, @PathVariable long id) {
        return new ResponseEntity<>(userService.updateUser(userDto, id), HttpStatus.OK);
    }

    @DeleteMapping("/api/users/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable long id) {
        userService.deleteUserById(id);
        return new ResponseEntity<>("Car entity deleted successfully.", HttpStatus.OK);
    }

    @GetMapping("/api/test/users")
    public ResponseEntity<List<User>> returnAllUser() {
        return new ResponseEntity<>(userService.returnAllUser(), HttpStatus.OK);
    }


    @GetMapping("/api/users/wishList/{username}/{idCar}")
    public ResponseEntity<String> updateWishListUser(@PathVariable String username, @PathVariable Long idCar) {
        return new ResponseEntity<>(userService.updateWishListUser(username, idCar), HttpStatus.OK);
    }

    @GetMapping("/api/users/{username}/wishList")
    public ResponseEntity<List<CarDto>> getWishListCar(@PathVariable String username) {
        return new ResponseEntity<>(userService.getWishListCar(username), HttpStatus.OK);
    }

    @GetMapping("/api/users/{username}/completedCommands")
    public ResponseEntity<List<CommandDto>> getCompletedCommands(@PathVariable String username) {
        return new ResponseEntity<>(userService.getCompletedCommands(username), HttpStatus.OK);
    }

    @GetMapping("/api/users/{username}/onProcessCommands")
    public ResponseEntity<List<CommandDto>> getOnProcessCommands(@PathVariable String username) {
        return new ResponseEntity<>(userService.getOnProcessCommands(username), HttpStatus.OK);
    }

    @PostMapping("/api/users/{username}/commands")
    public ResponseEntity<String> updateOnProcessCommands(@PathVariable String username, @Valid @RequestBody CommandDto commandDto) {
        return new ResponseEntity<>(userService.updateOnProcessCommands(username, commandDto), HttpStatus.OK);
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/api/test/users/{id}")
    public ResponseEntity<User> returnUserById(@PathVariable long id) {
        return new ResponseEntity<>(userService.returnUserById(id), HttpStatus.OK);
    }
}
