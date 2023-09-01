package com.proiectdepractica.backend.repository;

import com.proiectdepractica.backend.entity.Command;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommandRepository extends JpaRepository<Command, Long> {
    @Query(
            value = "SELECT * FROM commands c WHERE c.is_completed = false",
            nativeQuery = true)
    List<Command> findByCompletedFalse();

    @Query(
            value = "SELECT * FROM commands c WHERE c.is_completed = true",
            nativeQuery = true)
    List<Command> findByCompletedTrue();

    @Query(
            value = "SELECT * FROM commands c WHERE c.is_completed = true and c.id_user = ?1",
            nativeQuery = true)
    List<Command> findByCompletedTrueAndId_user(Long id);

    @Query(
            value = "SELECT * FROM commands c WHERE c.is_completed = false and c.id_user = ?1",
            nativeQuery = true)
    List<Command> findByCompletedTFalseAndId_user(Long id);
}
