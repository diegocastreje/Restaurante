package com.diego.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diego.models.entity.Empleado;
import com.diego.models.entity.Rol;
import com.diego.models.enums.RolNombre;
import com.diego.models.services.EmpleadoServiceImpl;
import com.diego.models.services.IEmpleadoService;
import com.diego.models.services.RolServiceImpl;
import com.diego.security.dto.NuevoEmpleado;

@RestController
@RequestMapping("/restaurante")
@CrossOrigin(origins = {"http://localhost:4200", "*"})
public class EmpleadosController {
	
	@Autowired
	private IEmpleadoService empleadoService;
	
	@Autowired
	private EmpleadoServiceImpl empleadoServiceImpl;
	
	@Autowired
	private RolServiceImpl rolService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
		
	//@PreAuthorize("hasRole('ROL_JEFE')")
	@GetMapping("/empleados")	
	public List<Empleado> index(){
		return empleadoService.findAll();
	}
	
	//@PreAuthorize("hasRole('ROL_JEFE')")
	@GetMapping("/empleados/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		
		Empleado empleado = null;
		Map<String, Object> response = new HashMap<>();

		try {
			empleado = empleadoService.findById(id);
		}catch(DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
			
		if(empleado == null) {
			response.put("mensaje", "El empleado ID:".concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Empleado>(empleado, HttpStatus.OK);
	}
	
	//@PreAuthorize("hasRole('ROL_JEFE')")
	@PostMapping("/empleados")
	public ResponseEntity<?> create(@Valid @RequestBody NuevoEmpleado nuevoEmpleado, BindingResult bindingResult) {
		
		if(bindingResult.hasErrors())
			return new ResponseEntity("Campos incorrectos", HttpStatus.BAD_REQUEST);
		if(empleadoServiceImpl.existsByUsuario(nuevoEmpleado.getUsuario()))
			return new ResponseEntity("Ese nombre de usuario ya existe", HttpStatus.BAD_REQUEST);
		if(empleadoServiceImpl.existsByEmail(nuevoEmpleado.getEmail()))
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
	
	//@PreAuthorize("hasRole('ROL_JEFE')")
	@PutMapping("/empleados/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Empleado empleado, BindingResult result, @PathVariable Long id) {
		
		Empleado empleadoActual = empleadoService.findById(id);
		Empleado empleadoUpdated = null;
		
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			
			List<String> errors = new ArrayList<>();
			for(FieldError err: result.getFieldErrors()) {
				errors.add("El campo '" + err.getField() + "' " + err.getDefaultMessage());
			}
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if(empleadoActual == null) {
			response.put("mensaje", "Error, no se pudo editar, el empleado ID:".concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			
			empleadoActual.setUsuario(empleado.getUsuario());
			empleadoActual.setPassword(empleado.getPassword());
			empleadoActual.setNombre(empleado.getNombre());
			empleadoActual.setApellido(empleado.getApellido());
			empleadoActual.setEmail(empleado.getEmail());
			empleadoActual.setSalario(empleado.getSalario());
		
			empleadoUpdated = empleadoService.save(empleadoActual);
		
		}catch(DataAccessException e){
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje","El empleado ha sido actualizado con éxito");
		response.put("empleado", empleadoUpdated);
		
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED); 
	}
	
	//@PreAuthorize("hasRole('ROL_JEFE')")
	@DeleteMapping("/empleados/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		
		Map<String, Object> response = new HashMap<>();
		
		try {
			
			empleadoService.delete(id);
			
		}catch(DataAccessException e){
			response.put("mensaje", "Error al eliminar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El empleado ha sido eliminado con éxito");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

}
