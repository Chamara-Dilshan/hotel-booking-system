package com.hotelmanagement.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

	@Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Hotel Management System API")
                        .description("API documentation for Hotel Management System")
                        .version("1.1.0")
                        .contact(new Contact()
                                .name("Hotel Management Team")
                                .email("")
                                .url(""))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0")));
    }

    // SpringDoc OpenAPI UI is available at:
    // http://localhost:8080/swagger-ui/index.html
    // API docs JSON: http://localhost:8080/v3/api-docs

}
