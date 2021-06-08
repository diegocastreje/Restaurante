package com.diego.models.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diego.models.entity.Empleado;

@Repository
public interface IEmpleadoDao extends JpaRepository<Empleado, Long>{
	
	public Optional<Empleado> findByUsuario(String usuario);
	public boolean existsByUsuario(String usuario);
	public boolean existsByEmail(String email);
}
