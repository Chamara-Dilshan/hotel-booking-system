package com.hotelmanagement.dto;

import java.util.List;

import com.hotelmanagement.entity.User;

import lombok.Data;

@Data
public class UsersResponseDto extends CommonApiResponse {
	
	private List<User> users;
	
	private User user;

}
