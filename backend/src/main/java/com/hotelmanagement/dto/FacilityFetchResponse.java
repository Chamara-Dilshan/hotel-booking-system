package com.hotelmanagement.dto;

import java.util.Set;

import com.hotelmanagement.entity.Facility;

import lombok.Data;

@Data
public class FacilityFetchResponse extends CommonApiResponse { 
	
	private Set<Facility> facilities;

}
