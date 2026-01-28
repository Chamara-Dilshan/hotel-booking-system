package com.hotelmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelmanagement.repository.BookingRepository;
import com.hotelmanagement.entity.Booking;

@Service
public class BookingService {
	
	@Autowired
	private BookingRepository bookingRepository;
	
	public Booking bookHotel(Booking booking) {
		return bookingRepository.save(booking);
	}

	public List<Booking> getAllBookings() {
		return bookingRepository.findAll();
	}
	
	public List<Booking> getMyBookings(int userId) {
		return bookingRepository.findByUserId(userId);
	}
	
	public List<Booking> getMyHotelBookings(int hotelId) {
		return bookingRepository.findByHotelId(hotelId);
	}
	
	public Booking getBookingById(int bookingId) {
		return bookingRepository.findById(bookingId).get();
	}
	
	
}
