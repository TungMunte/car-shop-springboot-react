package com.proiectdepractica.backend.repository;

import com.proiectdepractica.backend.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findAllByType(String type);

    List<Car> findAllByPriceBetween(Long startPrice, Long endPrice);
}
