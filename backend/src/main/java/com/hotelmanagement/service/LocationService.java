package com.hotelmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.hotelmanagement.repository.LocationRepository;
import com.hotelmanagement.entity.Location;

@Service
public class LocationService {
	
	@Autowired
	private LocationRepository locationRepository;
	
	public Location addLocation(@RequestBody Location location) {
		return locationRepository.save(location);
	}
	
	public List<Location> fetchAllLocations() {
		return locationRepository.findAll();
	}
	
	public Location getLocationById(int id) {
		return locationRepository.findById(id).get();
	}

}
