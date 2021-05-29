package com.diego.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.diego.models.entity.Empleado;

public interface IEmpleadoDao extends CrudRepository<Empleado, Long>{
	
}
