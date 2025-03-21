package com.shop.shop.config;


import com.shop.shop.data.domain.Order;
import com.shop.shop.data.domain.OrderItem;
import com.shop.shop.data.domain.Review;
import com.shop.shop.data.domain.User;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.Arrays;
import java.util.List;

@Configuration
public class OpenApi implements RepositoryRestConfigurer {
    @Bean
    public OpenAPI springArchivalManagementApi() {
        return new OpenAPI()
                .info(new Info().title("Posting Module API")
                        .description("Posting Module API used by Bank users.")
                        .version("v1.0.0"));
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
        config.exposeIdsFor(User.class);
        config.exposeIdsFor(Order.class);
        config.exposeIdsFor(OrderItem.class);
        config.exposeIdsFor(Review.class);
    }
}