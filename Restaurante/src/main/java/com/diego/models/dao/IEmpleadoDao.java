package com.diego.models.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diego.models.entity.Empleado;

@Repository
public interface IEmpleadoDao extends JpaRepository<Empleado, Long>{
	
	Optional<Empleado> findByUsuario(String usuario);
	boolean existsByUsuario(String usuario);
	boolean existsByEmail(String email);
}
