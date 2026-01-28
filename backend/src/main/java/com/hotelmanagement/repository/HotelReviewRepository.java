package com.hotelmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelmanagement.entity.HotelReview;

@Repository
public interface HotelReviewRepository extends JpaRepository<HotelReview, Integer> {

	List<HotelReview> findByHotelId(int hotelId);
	
}
