package com.hotelmanagement.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component
public class RequestHeaderInterceptor implements  HandlerInterceptor {
	
	private static final Logger LOG = LoggerFactory.getLogger(RequestHeaderInterceptor.class);
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
	
		// we can validate few things before the request goes to controller 
		
//		if(StringUtils.isEmpty(request.getHeader("Authorization"))) {
//			// throw exception    
//		}
		
		LOG.debug("preHandle() method invoked");
		
		LOG.info("---------------- Request Start ---------------");
		LOG.info("Request URL: {}", request.getRequestURI());
		LOG.info("Method Type: {}", request.getMethod());
		
		return true;
	}
	
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		LOG.debug("postHandle() method invoked");
		
		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}
	
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		
		LOG.debug("afterCompletion() method invoked");
		
		LOG.info("Request URL: {}", request.getRequestURI());
		LOG.info("Method Type: {}", request.getMethod());
		LOG.info("Status: {}", response.getStatus());
		LOG.info("---------------- Request End ---------------");
		
		HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
	}

}
