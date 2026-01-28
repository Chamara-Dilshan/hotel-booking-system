package com.hotelmanagement.dto;

import lombok.Data;

/**
 * Common API Response base class.
 * @deprecated Use {@link ApiResponse} instead for new implementations.
 */
@Data
@Deprecated
public class CommonApiResponse {
	
	private int responseCode;
	
	private String responseMessage;
	
}
