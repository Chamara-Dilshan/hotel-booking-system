package com.hotelmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelmanagement.entity.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {

}
