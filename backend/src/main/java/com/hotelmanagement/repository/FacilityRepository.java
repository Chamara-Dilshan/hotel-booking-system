package com.hotelmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelmanagement.entity.Facility;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Integer> {

}
