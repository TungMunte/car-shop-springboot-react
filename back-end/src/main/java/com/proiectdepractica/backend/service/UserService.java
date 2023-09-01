package com.proiectdepractica.backend.service;

import com.proiectdepractica.backend.entity.User;
import com.proiectdepractica.backend.payload.CarDto;
import com.proiectdepractica.backend.payload.CommandDto;
import com.proiectdepractica.backend.payload.UserDto;
import com.proiectdepractica.backend.payload.UserUpdateDto;

import java.util.List;

public interface UserService {

    List<UserDto> getAllUsers(int pageNo, int pageSize, String sortBy, String sortDir);

    UserDto getUserById(Long id);

    UserDto getUserByUsername(String username);

    UserUpdateDto updateUserByUsername(UserUpdateDto userUpdateDto, String username);

    UserDto updateUser(UserDto userDto, long id);

    void deleteUserById(Long id);

    List<User> returnAllUser();

    User returnUserById(Long id);

    String updateWishListUser(String username, Long idCar);

    List<CarDto> getWishListCar(String username);

    List<CommandDto> getCompletedCommands(String username);

    List<CommandDto> getOnProcessCommands(String username);

    String updateOnProcessCommands(String username, CommandDto commandDto);
}
