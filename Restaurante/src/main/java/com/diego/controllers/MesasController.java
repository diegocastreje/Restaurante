package com.diego.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.diego.models.entity.Mesa;
import com.diego.models.entity.Producto;
import com.diego.models.services.IMesaService;
import com.diego.models.services.IProductoService;

@RestController
@RequestMapping("/restaurante")
@CrossOrigin(origins = {"http://localhost:4200", "*"})
public class MesasController {
	
	@Autowired
	private IMesaService mesaService;
	
	@Autowired
	private IProductoService productoService;
	
	@GetMapping("/mesas")	
	public List<Mesa> index(){
		return mesaService.findAll();
	}
	
	@GetMapping("/mesas/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Mesa show(@PathVariable Long id) {
		return mesaService.findById(id);
	}
	
	@GetMapping("/mesas/filtrar-productos/{term}")
	@ResponseStatus(HttpStatus.OK)
	public List<Producto> filtrarProductos(@PathVariable String term){
		return productoService.findByNombre(term);
	}
	
	@PostMapping("/mesas")
	@ResponseStatus(HttpStatus.CREATED)
	public Mesa crear(@RequestBody Mesa mesa) {
		return mesaService.save(mesa);
	}
	
	@DeleteMapping("/mesas/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		System.out.println("borra: " + id);
		mesaService.deleteMesaById(id);
	}
	
	@PutMapping("/mesas/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Mesa mesa, BindingResult result, @PathVariable Long id) {
		
		Mesa mesaActual = mesaService.findById(id);
		Mesa mesaUpdated = null;
		
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			
			List<String> errors = new ArrayList<>();
			for(FieldError err: result.getFieldErrors()) {
				errors.add("El campo '" + err.getField() + "' " + err.getDefaultMessage());
			}
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if(mesaActual == null) {
			response.put("mensaje", "Error, no se pudo editar, el producto ID:".concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			
			mesaActual.setProductos(mesa.getProductos());
			
			mesaUpdated = mesaService.save(mesaActual);
		
		}catch(DataAccessException e){
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje","La mesa ha sido guardada con éxito");
		response.put("mesa", mesaUpdated);
		
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED); 
	}

}
