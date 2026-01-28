package com.hotelmanagement.dto;

import com.hotelmanagement.entity.Hotel;
import lombok.Data;

@Data
public class HotelResponseDto extends CommonApiResponse {
	
	private Hotel hotel;

}
