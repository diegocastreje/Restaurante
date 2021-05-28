package com.diego.models.services;

import java.util.List;

import com.diego.models.entity.Empleado;

public interface IEmpleadoService {
	
	public List<Empleado> findAll();
		
	public Empleado save(Empleado empleado);

	public void delete(Long id);
	
	public Empleado findById(Long id);

}
