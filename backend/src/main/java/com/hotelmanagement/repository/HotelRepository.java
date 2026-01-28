package com.hotelmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelmanagement.entity.Hotel;
import com.hotelmanagement.entity.Location;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {
	
	List<Hotel> findByLocation(Location locationId);
	
}
