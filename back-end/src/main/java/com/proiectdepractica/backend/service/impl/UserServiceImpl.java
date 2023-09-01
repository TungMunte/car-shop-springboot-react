package com.proiectdepractica.backend.service.impl;

import com.proiectdepractica.backend.entity.Car;
import com.proiectdepractica.backend.entity.Command;
import com.proiectdepractica.backend.entity.User;
import com.proiectdepractica.backend.exception.ResourceNotFoundException;
import com.proiectdepractica.backend.payload.CarDto;
import com.proiectdepractica.backend.payload.CommandDto;
import com.proiectdepractica.backend.payload.UserDto;
import com.proiectdepractica.backend.payload.UserUpdateDto;
import com.proiectdepractica.backend.repository.CarRepository;
import com.proiectdepractica.backend.repository.CommandRepository;
import com.proiectdepractica.backend.repository.UserRepository;
import com.proiectdepractica.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private CommandRepository commandRepository;
    private CarRepository carRepository;
    private ModelMapper mapper;
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, ModelMapper mapper, PasswordEncoder passwordEncoder, CarRepository carRepository, CommandRepository commandRepository) {
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
        this.commandRepository = commandRepository;
    }

    @Override
    public List<UserDto> getAllUsers(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<User> users = userRepository.findAll(pageable);
        List<User> userList = users.getContent();
        List<UserDto> responseUserDto = userList.stream().map(user -> mapper.map(user, UserDto.class)).collect(Collectors.toList());

        return responseUserDto;
    }

    @Override
    public UserDto getUserById(Long id) {

        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        UserDto userDto = mapper.map(user, UserDto.class);
        return userDto;
    }

    public UserDto getUserByUsername(String username) {

        User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User", "username", 0L));
        UserDto userDto = mapper.map(user, UserDto.class);
        return userDto;
    }

    public UserUpdateDto updateUserByUsername(UserUpdateDto userUpdateDto, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User", "username", 0L));
        user.setEmail(userUpdateDto.getEmail());
        user.setUsername(userUpdateDto.getUsername());
        User updatedUser = userRepository.save(user);
        UserUpdateDto response = mapper.map(updatedUser, UserUpdateDto.class);
        return response;
    }

    @Override
    public UserDto updateUser(UserDto userDto, long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        user.setEmail(userDto.getEmail());
        user.setName(userDto.getUsername());
        user.setUsername(userDto.getUsername());
        user.setRoles(user.getRoles());
        user.setCompletedCommands(user.getCompletedCommands());
        user.setOnProcessCommands(user.getOnProcessCommands());
        user.setReviews(user.getReviews());
        user.setWishListCars(user.getWishListCars());

        User updatedUser = userRepository.save(user);
        UserDto reponseUser = mapper.map(updatedUser, UserDto.class);

        return reponseUser;
    }

    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public List<User> returnAllUser() {
        return userRepository.findAll();
    }

    public User returnUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    public String updateWishListUser(String username, Long idCar) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User", "username", 0L));
        Car car = carRepository.findById(idCar).orElseThrow(() -> new ResourceNotFoundException("Car", "id", idCar));
        Set<Car> newWishListCar = new HashSet<>(user.getWishListCars());
        newWishListCar.add(car);
        user.setWishListCars(newWishListCar);
        userRepository.save(user);
        return "updated wishList for user";
    }

    @Override
    public List<CarDto> getWishListCar(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User", "username", 0L));
        Set<Car> cars = new HashSet<>(user.getWishListCars());
        List<CarDto> response = cars.stream().map(car -> mapper.map(car, CarDto.class)).toList();
        return response;
    }

    @Override
    public List<CommandDto> getCompletedCommands(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User", "username", 0L));
        Set<Command> commands = new HashSet<>(user.getCompletedCommands());
        List<CommandDto> response = commands.stream().map(car -> mapper.map(car, CommandDto.class)).toList();
        return response;
    }

    @Override
    public List<CommandDto> getOnProcessCommands(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User", "username", 0L));
        Set<Command> commands = new HashSet<>(user.getOnProcessCommands());
        List<CommandDto> response = commands.stream().map(car -> {
            CommandDto commandDto = mapper.map(car, CommandDto.class);
            commandDto.setUsername(user.getUsername());
            return commandDto;
        }).toList();
        return response;
    }

    @Override
    public String updateOnProcessCommands(String username, CommandDto commandDto) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User", "username", 0L));
        Car car = carRepository.findById(commandDto.getId_car()).orElseThrow(() -> new ResourceNotFoundException("Car", "id", commandDto.getId_car()));
        Command command = mapper.map(commandDto, Command.class);
        command.setUser(user);
        command.setCar(car);
        command.setId_user(user.getId());
        command.setId_car(car.getId());
        Command savedCommand = commandRepository.save(command);
        Set<Command> commands = new HashSet<>(user.getOnProcessCommands());
        commands.add(savedCommand);
        user.setOnProcessCommands(commands);

        return "updated new commands and commands for user";
    }
}
