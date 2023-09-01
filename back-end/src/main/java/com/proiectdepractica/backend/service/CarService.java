package com.proiectdepractica.backend.service;

import com.proiectdepractica.backend.entity.Car;
import com.proiectdepractica.backend.payload.CarDto;

import java.util.List;
import java.util.Set;

public interface CarService {

    CarDto createCar(CarDto carDto);

    List<CarDto> getAllCars(int pageNo, int pageSize, String sortBy, String sortDir);

    CarDto getCarById(Long id);

    CarDto updateCar(CarDto carDto, Long id);

    void deleteCarById(Long id);

    List<CarDto> getCarsByType(String type);

    List<CarDto> getCarsByPrice(Long startPrice, Long endPrice);

    List<Car> returnAllCars();

}
