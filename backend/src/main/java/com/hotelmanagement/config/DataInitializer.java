package com.hotelmanagement.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.hotelmanagement.entity.User;
import com.hotelmanagement.repository.UserRepository;

/**
 * Initializes the application with default data on first startup.
 * Creates a default Super Admin if no admin exists in the database.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger LOG = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Default admin credentials - can be overridden via application.properties or environment variables
    @Value("${app.admin.email:admin@hotel.com}")
    private String adminEmail;

    @Value("${app.admin.password:admin123}")
    private String adminPassword;

    @Value("${app.admin.firstName:Super}")
    private String adminFirstName;

    @Value("${app.admin.lastName:Admin}")
    private String adminLastName;

    @Override
    public void run(String... args) throws Exception {
        createDefaultAdminIfNotExists();
    }

    private void createDefaultAdminIfNotExists() {
        // Check if admin email already exists
        User existingAdmin = userRepository.findByEmailId(adminEmail);
        
        if (existingAdmin == null) {
            LOG.info("No admin found. Creating default Super Admin...");
            
            User admin = new User();
            admin.setFirstName(adminFirstName);
            admin.setLastName(adminLastName);
            admin.setEmailId(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword)); // Encode password with BCrypt
            admin.setRole("Admin");
            admin.setContact("0000000000");
            admin.setCity("System");
            admin.setStreet("System");
            admin.setPincode("000000");
            admin.setAge(30);
            admin.setSex("Male");
            
            userRepository.save(admin);
            
            LOG.info("========================================");
            LOG.info("DEFAULT ADMIN CREATED SUCCESSFULLY!");
            LOG.info("Email: {}", adminEmail);
            LOG.info("Password: {}", adminPassword);
            LOG.info("========================================");
            LOG.warn("Please change the default password after first login!");
        } else {
            LOG.info("Admin already exists. Skipping default admin creation.");
        }
    }
}
