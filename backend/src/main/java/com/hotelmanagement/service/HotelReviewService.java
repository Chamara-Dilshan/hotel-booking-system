package com.hotelmanagement.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hotelmanagement.repository.HotelReviewRepository;
import com.hotelmanagement.entity.HotelReview;

@Service
public class HotelReviewService {
	
	@Autowired
	private HotelReviewRepository hotelReviewRepository;
	
	public HotelReview addHotelReview(HotelReview review) {
		return hotelReviewRepository.save(review);
	}
	
	public List<HotelReview> fetchHotelReviews(int hotelId) {
		return hotelReviewRepository.findByHotelId(hotelId);
	}

}
