package com.diego.models.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diego.models.entity.Rol;
import com.diego.security.enums.RolNombre;

@Repository
public interface IRolDao extends JpaRepository<Rol, Long>{
	Optional<Rol> findByNombre(RolNombre nombre);
}
