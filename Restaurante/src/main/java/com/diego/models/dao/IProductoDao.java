package com.diego.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.diego.models.entity.Producto;

public interface IProductoDao extends JpaRepository<Producto, Long>{
	
	@Query("SELECT p FROM Producto p WHERE p.nombre LIKE %?1%")
	public List<Producto> findByNombre(String term);

}
