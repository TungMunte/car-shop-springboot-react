package com.proiectdepractica.backend.service.impl;

import com.proiectdepractica.backend.entity.Car;
import com.proiectdepractica.backend.exception.ResourceNotFoundException;
import com.proiectdepractica.backend.payload.CarDto;
import com.proiectdepractica.backend.repository.CarRepository;
import com.proiectdepractica.backend.service.CarService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarServiceImpl implements CarService {
    private CarRepository carRepository;
    private ModelMapper mapper;

    public CarServiceImpl(CarRepository carRepository, ModelMapper mapper) {
        this.carRepository = carRepository;
        this.mapper = mapper;
    }


    @Override
    public CarDto createCar(CarDto carDto) {

        Car car = mapper.map(carDto, Car.class);
        Car savedCar = carRepository.save(car);
        CarDto carResponse = mapper.map(savedCar, CarDto.class);

        return carResponse;
    }

    @Override
    public List<CarDto> getAllCars(int pageNo, int pageSize, String sortBy, String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Car> cars = carRepository.findAll(pageable);

        List<Car> carList = cars.getContent();
        List<CarDto> carDtoList = carList.stream().map(car -> mapper.map(car, CarDto.class)).collect(Collectors.toList());

        return carDtoList;
    }

    @Override
    public CarDto getCarById(Long id) {
        Car car = carRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Car", "id", id));
        CarDto carDto = mapper.map(car, CarDto.class);
        return carDto;
    }

    @Override
    public CarDto updateCar(CarDto carDto, Long id) {
        Car car = carRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Car", "id", id));

        car.setPrice(carDto.getPrice());
        car.setType(carDto.getType());

        Car savedCar = carRepository.save(car);
        CarDto carResponse = mapper.map(savedCar, CarDto.class);
        return carResponse;
    }

    @Override
    public void deleteCarById(Long id) {
        carRepository.deleteById(id);
    }

    @Override
    public List<CarDto> getCarsByType(String type) {
        List<Car> cars = carRepository.findAllByType(type);
        List<CarDto> carDtos = cars.stream().map(car -> mapper.map(car, CarDto.class)).collect(Collectors.toList());
        return carDtos;
    }

    @Override
    public List<CarDto> getCarsByPrice(Long startPrice, Long endPrice) {
        List<Car> cars = carRepository.findAllByPriceBetween(startPrice, endPrice);
        List<CarDto> carDtos = cars.stream().map(car -> mapper.map(car, CarDto.class)).collect(Collectors.toList());
        return carDtos;
    }

    @Override
    public List<Car> returnAllCars() {
        return carRepository.findAll();
    }
}
