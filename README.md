# Hotel Booking System

A full-stack web application for hotel discovery, booking, and management with integrated payment processing and role-based access control.

## Overview

This Hotel Booking System enables users to search for hotels, make reservations, process payments through Stripe, and manage bookings. The system supports multiple user roles including customers, hotel managers, and administrators, providing a comprehensive solution for hotel management and booking operations.

## Features

- **Hotel Discovery & Search**: Browse and search hotels by location with detailed information
- **Booking Management**: Complete reservation system with date selection and guest management
- **Payment Integration**: Secure Stripe payment processing with multi-currency support
- **User Authentication**: JWT-based authentication with role-based access control
- **Review System**: 5-star rating and review system for hotels
- **Admin Dashboard**: Employee and booking management interface
- **Hotel Management**: Facility management and hotel registration for managers
- **Email Notifications**: Automated booking confirmations via email
- **Image Gallery**: Support for up to 3 images per hotel listing
- **Trip Planner**: Built-in trip planning tool

## Technology Stack

### Backend
- **Framework**: Spring Boot 2.2.2
- **Language**: Java 8
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA
- **Security**: Spring Security + JWT
- **Payment**: Stripe Java SDK
- **API Documentation**: Swagger/Springfox
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18.2.0
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **UI Framework**: React Bootstrap + Bootstrap 5
- **Payment UI**: React Stripe Checkout
- **Notifications**: React Toastify
- **Email Service**: EmailJS
- **Date Handling**: React DatePicker, React Date Range
- **Icons**: FontAwesome 6

## Prerequisites

Before running this project, ensure you have the following installed:

- Java 8 or higher
- Maven 3.x
- Node.js (v14 or higher)
- PostgreSQL database server
- Git

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hotel-booking-system
```

### 2. Database Setup

Create the PostgreSQL database:

```sql
CREATE DATABASE hotelManagementSystemFinal;
```

### 3. Backend Configuration

Navigate to the backend directory and configure the database connection:

```bash
cd backend
```

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hotelManagementSystemFinal
spring.datasource.username=your_postgres_username
spring.datasource.password=your_postgres_password

# File upload directory
file.upload-dir=D:/hotel-images
```

Create the image storage directory specified in the configuration.

### 4. Backend Installation

Install dependencies and run the backend:

```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 5. Frontend Configuration

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

### 6. Frontend Installation

Start the development server:

```bash
npm start
```

The frontend will start on `http://localhost:3000`

## Running the Application

### Development Mode

1. Start the backend server:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. In a separate terminal, start the frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Access the application at `http://localhost:3000`

### Production Build

**Backend:**
```bash
cd backend
mvn clean package -DskipTests
java -jar target/hotel-management-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
cd frontend
npm run build
# Deploy the 'build' folder to your hosting service
```

## Project Structure

```
hotel-booking-system/
├── backend/                          # Spring Boot backend
│   ├── src/main/java/com/hotelmanagement/
│   │   ├── controller/              # REST API controllers
│   │   ├── service/                 # Business logic layer
│   │   ├── repository/              # Data access layer
│   │   ├── entity/                  # JPA entities
│   │   ├── dto/                     # Data Transfer Objects
│   │   ├── config/                  # Configuration classes
│   │   ├── filter/                  # JWT authentication filter
│   │   ├── exception/               # Custom exceptions
│   │   └── utility/                 # Helper utilities
│   └── pom.xml
│
└── frontend/                         # React frontend
    ├── src/
    │   ├── BookingComponent/        # Booking-related components
    │   ├── HotelComponent/          # Hotel display components
    │   ├── LocationComponent/       # Location management
    │   ├── FacilityComponent/       # Facility management
    │   ├── HotelReviewComponent/    # Review components
    │   ├── UserComponent/           # Authentication components
    │   ├── Payment/                 # Payment integration
    │   ├── NavbarComponent/         # Navigation
    │   ├── page/                    # Main pages
    │   ├── App.js                   # Router configuration
    │   └── index.js
    └── package.json
```

## API Documentation

Once the backend is running, access the interactive API documentation:

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **API Docs JSON**: `http://localhost:8080/v2/api-docs`

### Key Endpoints

- **Hotels**: `/api/hotel/` - Search, register, and manage hotels
- **Bookings**: `/api/book/hotel` - Create and manage reservations
- **Users**: `/api/user/` - Registration, login, and profile management
- **Locations**: `/api/location/` - Location CRUD operations
- **Facilities**: `/api/facility/` - Hotel amenities management
- **Reviews**: `/api/review/` - Submit and view hotel reviews
- **Employees**: `/api/employee/` - Employee management (admin only)

## User Roles

The system supports three user roles:

1. **CUSTOMER**: Browse hotels, make bookings, write reviews
2. **HOTEL_MANAGER**: Manage hotel listings and information
3. **ADMIN**: Full system access, employee and booking management

## Configuration

### Environment Variables (Production)

For production deployment, use environment variables:

```properties
DATABASE_URL=jdbc:postgresql://your-production-db:5432/hoteldb
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
STRIPE_API_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret
FILE_UPLOAD_DIR=/path/to/upload/directory
```

### Stripe Configuration

To enable payment processing:

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Configure backend with secret key
4. Configure frontend with publishable key

For testing, use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Database Schema

Key entities:
- **User**: System users with role-based access
- **Hotel**: Hotel information and details
- **Booking**: Reservation records
- **Location**: City/location data
- **Facility**: Hotel amenities
- **HotelReview**: User reviews and ratings
- **Employee**: Staff management

## Security

- Passwords encrypted with BCrypt
- JWT token-based authentication
- Stateless session management
- CORS configured for frontend access
- Input validation on all endpoints

## Troubleshooting

### Common Issues

**CORS Errors**: Verify `@CrossOrigin` annotation in controllers or check SecurityConfig

**Database Connection Failed**: Ensure PostgreSQL is running and credentials are correct

**JWT Token Expired**: Implement token refresh or prompt user to re-login

**Image Upload Fails**: Check upload directory exists and has write permissions

**Port Already in Use**: Change port in application.properties (backend) or package.json (frontend)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is available for educational and commercial use.

## Support

For detailed documentation, see [CLAUDE.md](CLAUDE.md)

For issues and questions, please open an issue in the repository.

## Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful UI library
- Stripe for payment processing capabilities
- All contributors to the open-source libraries used in this project

---

**Built with Spring Boot and React**
