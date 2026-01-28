package com.hotelmanagement.dto;

import java.util.List;
import com.hotelmanagement.entity.HotelReview;
import lombok.Data;

@Data
public class HotelReviewResponseDto extends CommonApiResponse {
	
	private List<HotelReviewDto> hotelReviews;

}
