package com.hotelmanagement.dto;

import java.util.List;

import lombok.Data;

@Data
public class BookingDetailDto extends CommonApiResponse {
	
	List<BookingDto> bookings;

}
