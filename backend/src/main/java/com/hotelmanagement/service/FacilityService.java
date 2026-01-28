package com.hotelmanagement.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelmanagement.repository.FacilityRepository;
import com.hotelmanagement.entity.Facility;

@Service
public class FacilityService {
	
	@Autowired
	private FacilityRepository facilityRepository;
	
	public Facility addFacility(Facility facility) {
		return facilityRepository.save(facility);
	}
	
	public Set<Facility> fetchAllFacilities() {
		return new HashSet<Facility>(facilityRepository.findAll());	
	}
	
	public Facility getFacilityById(int facilityId) {
		return facilityRepository.findById(facilityId).get();
	}
 
}
