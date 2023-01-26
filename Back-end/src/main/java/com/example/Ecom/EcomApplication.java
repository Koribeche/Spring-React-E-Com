package com.example.Ecom;

import com.example.Ecom.DTO.RegisterDTO;
import com.example.Ecom.DTO.UserDTO;
import com.example.Ecom.model.Adresse;
import com.example.Ecom.model.Role;
import com.example.Ecom.model.User;
import com.example.Ecom.repository.UserRepository;
import com.example.Ecom.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.DataSourceInitializer;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

import javax.sql.DataSource;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@SpringBootApplication
public class EcomApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcomApplication.class, args);
	}

	@Bean
	@Transactional
	CommandLineRunner run(UserService userService)
	{
		return args -> {

			try{
				RegisterDTO registerDTO = new RegisterDTO("admin@gmail.com",
						"123456",
						"admin",
						"admin",
						"107 mohamed saidoun",
						"",
						"16000",
						"Kouba",
						"Alger");
				User admin = userService.createUser(registerDTO);
				userService.addRoleToUser(admin.getEmail(),"ROLE_ADMIN");
			}
			catch(Exception e){
				System.out.println(e.getMessage());
			}

		};
	}
}
