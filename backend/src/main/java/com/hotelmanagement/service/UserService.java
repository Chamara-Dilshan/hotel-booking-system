package com.hotelmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelmanagement.repository.UserRepository;
import com.hotelmanagement.entity.User;


@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public User registerUser(User user) {
		User registeredUser = null;
		if(user != null) {
			registeredUser = this.userRepository.save(user);
		}
		
		return registeredUser;
	}
	
	public User getUserByEmailIdAndPassword(String emailId, String password) {
		return this.userRepository.findByEmailIdAndPassword(emailId, password);
	}
	
	public User getUserByEmailIdAndPasswordAndRole(String emailId, String password, String role) {
		return this.userRepository.findByEmailIdAndPasswordAndRole(emailId, password, role);
	}
	
	public User getUserByEmailIdAndRole(String emailId, String role) {
		return this.userRepository.findByEmailIdAndRole(emailId, role);
	}
	
	public User getUserByEmailId(String emailId) {
		return this.userRepository.findByEmailId(emailId);
	}
	
	public List<User> getUsersByRoleAndHotelId(String role, int hotelId) {
		return this.userRepository.findByRoleAndHotelId(role, hotelId);
	}
	
	public User getUserById(int userId) {
		return this.userRepository.findById(userId).get();
	}
	
	public User updateUser(User user) {
		return this.userRepository.save(user);
	}

}
