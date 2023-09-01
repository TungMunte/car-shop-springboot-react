package com.proiectdepractica.backend.controller;

import com.proiectdepractica.backend.entity.Car;
import com.proiectdepractica.backend.payload.CarDto;
import com.proiectdepractica.backend.service.CarService;
import com.proiectdepractica.backend.utils.AppConstants;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="*")
public class CarController {

    private CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping("/api/cars")
    public ResponseEntity<CarDto> addCar(@RequestBody CarDto carDto) {
        return new ResponseEntity<>(carService.createCar(carDto), HttpStatus.CREATED);
    }

    @GetMapping("/api/cars")
    public ResponseEntity<List<CarDto>> getAllCars(
            @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir) {
        return new ResponseEntity<>(carService.getAllCars(pageNo, pageSize, sortBy, sortDir), HttpStatus.OK);
    }

    @GetMapping("/api/cars/{id}")
    public ResponseEntity<CarDto> getCarById(@PathVariable long id) {
        return new ResponseEntity<>(carService.getCarById(id), HttpStatus.OK);
    }

    @PutMapping("/api/cars/{id}")
    public ResponseEntity<CarDto> updateCar(@RequestBody CarDto carDto, @PathVariable long id) {
        return new ResponseEntity<>(carService.updateCar(carDto, id), HttpStatus.OK);
    }

    @DeleteMapping("/api/cars/{id}")
    public ResponseEntity<String> deleteCarById(@PathVariable long id) {
        carService.deleteCarById(id);
        return new ResponseEntity<>("Car entity deleted successfully.", HttpStatus.OK);
    }

    @GetMapping("/api/cars/type/{type}")
    public ResponseEntity<List<CarDto>> getCarsByType(@PathVariable String type) {
        return new ResponseEntity<>(carService.getCarsByType(type), HttpStatus.OK);
    }

    @GetMapping("/api/cars/price/{startPrice}/{endPrice}")
    public ResponseEntity<List<CarDto>> getCarsByPrice(@PathVariable Long startPrice, @PathVariable Long endPrice) {
        return new ResponseEntity<>(carService.getCarsByPrice(startPrice, endPrice), HttpStatus.OK);
    }

    @GetMapping("/api/test/cars")
    public ResponseEntity<List<Car>> returnAllCars() {
        return new ResponseEntity<>(carService.returnAllCars(), HttpStatus.OK);
    }

}
