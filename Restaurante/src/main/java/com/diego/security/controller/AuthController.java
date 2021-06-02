package com.diego.security.controller;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diego.models.entity.Empleado;
import com.diego.models.entity.Rol;
import com.diego.models.services.EmpleadoServiceImpl;
import com.diego.models.services.RolServiceImpl;
import com.diego.security.dto.JwtDto;
import com.diego.security.dto.LoginEmpleado;
import com.diego.security.dto.NuevoEmpleado;
import com.diego.security.enums.RolNombre;
import com.diego.security.jwt.JwtProvider;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	EmpleadoServiceImpl empleadoService;
	
	@Autowired
	RolServiceImpl rolService;
	
	@Autowired
	JwtProvider jwtProvider;
	
	@PostMapping("/nuevo")
	public ResponseEntity<?> nuevo(@Valid @RequestBody NuevoEmpleado nuevoEmpleado, BindingResult bindingResult){
		if(bindingResult.hasErrors())
			return new ResponseEntity("Campos incorrectos", HttpStatus.BAD_REQUEST);
		if(empleadoService.existsByUsuario(nuevoEmpleado.getUsuario()))
			return new ResponseEntity("Ese nombre de usuario ya existe", HttpStatus.BAD_REQUEST);
		if(empleadoService.existsByEmail(nuevoEmpleado.getEmail()))
			return new ResponseEntity("Ese email ya existe", HttpStatus.BAD_REQUEST);
		Empleado empleado = new Empleado(nuevoEmpleado.getUsuario(), passwordEncoder.encode(nuevoEmpleado.getPassword()), nuevoEmpleado.getNombre(), nuevoEmpleado.getApellido(), nuevoEmpleado.getEmail(), nuevoEmpleado.getSalario());
		Set<Rol> roles = new HashSet();
		roles.add(rolService.getByNombre(RolNombre.ROL_EMPLEADO).get());
		if(nuevoEmpleado.getRoles().contains("jefe"))
			roles.add(rolService.getByNombre(RolNombre.ROL_JEFE).get());
		empleado.setRoles(roles);
		empleadoService.save(empleado);
		return new ResponseEntity("Empleado guardado", HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<JwtDto> login(@Valid @RequestBody LoginEmpleado loginEmpleado, BindingResult bindingResult){
		if(bindingResult.hasErrors())
			return new ResponseEntity("Usuario o contraseña incorrectos", HttpStatus.BAD_REQUEST);
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginEmpleado.getUsuario(), loginEmpleado.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtProvider.generateToken(authentication);
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
		JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities());
		return new ResponseEntity(jwtDto ,HttpStatus.OK);
	}
}
