package com.hotelmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelmanagement.repository.HotelRepository;
import com.hotelmanagement.entity.Hotel;
import com.hotelmanagement.entity.Location;

@Service
public class HotelService {

	@Autowired
	private HotelRepository hotelRepository;

	public Hotel addHotel(Hotel hotel) {
		return hotelRepository.save(hotel);
	}
	
	public List<Hotel> fetchAllHotels() {
		return hotelRepository.findAll();
	}
	
	public List<Hotel> fetchHotelsByLocation(Location locationId) {
		return hotelRepository.findByLocation(locationId);
	}
	
	public Hotel fetchHotel(int hotelId) {
		return hotelRepository.findById(hotelId).get();
	}

}
