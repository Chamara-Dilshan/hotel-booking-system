package com.hotelmanagement.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hotelmanagement.repository.HotelFacilityRepository;
import com.hotelmanagement.entity.HotelFacility;

@Service
public class HotelFacilityService {
	
	@Autowired
	private HotelFacilityRepository hotelFacilityRepository;
	
	public List<HotelFacility> getHotelFacilitiesByHotelId(int hotelId) {
		return this.hotelFacilityRepository.findByHotelId(hotelId);
	}
	
	public HotelFacility addFacility(HotelFacility hotelFacility) {
	    return this.hotelFacilityRepository.save(hotelFacility);
	}

}
