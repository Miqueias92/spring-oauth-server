package com.example.resourceserver.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ResourceController {
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@GetMapping(path = "/clientes")
	public List<String> getClientes() {
		return Arrays.asList("João", "Maria", "José");
	}
	
	@GetMapping(path = "/dados")
	public List<String> getString() {
		return Arrays.asList("informação 01", "informação 02", "informação 03");
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping(path = "/clientes")
	public String post() {
		return "salvou";
	}
}
