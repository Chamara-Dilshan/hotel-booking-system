package com.hotelmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Generic API Response wrapper for standardized responses.
 * @param <T> The type of data payload
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    
    private int responseCode;
    
    private String responseMessage;
    
    private T data;
    
    private boolean success;
    
    /**
     * Create a success response with data
     */
    public static <T> ApiResponse<T> success(T data, String message) {
        return ApiResponse.<T>builder()
                .responseCode(200)
                .responseMessage(message)
                .data(data)
                .success(true)
                .build();
    }
    
    /**
     * Create a success response without data
     */
    public static <T> ApiResponse<T> success(String message) {
        return ApiResponse.<T>builder()
                .responseCode(200)
                .responseMessage(message)
                .success(true)
                .build();
    }
    
    /**
     * Create an error response
     */
    public static <T> ApiResponse<T> error(int code, String message) {
        return ApiResponse.<T>builder()
                .responseCode(code)
                .responseMessage(message)
                .success(false)
                .build();
    }
    
    /**
     * Create a not found response
     */
    public static <T> ApiResponse<T> notFound(String message) {
        return ApiResponse.<T>builder()
                .responseCode(404)
                .responseMessage(message)
                .success(false)
                .build();
    }
    
    /**
     * Create a bad request response
     */
    public static <T> ApiResponse<T> badRequest(String message) {
        return ApiResponse.<T>builder()
                .responseCode(400)
                .responseMessage(message)
                .success(false)
                .build();
    }
}
