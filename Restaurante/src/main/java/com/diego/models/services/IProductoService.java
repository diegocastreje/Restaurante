package com.diego.models.services;

import java.util.List;

import com.diego.models.entity.Producto;

public interface IProductoService {
	
	public List<Producto> findAll();
	
	public Producto save(Producto producto);

	public void delete(Long id);
	
	public Producto findById(Long id);
	
	public List<Producto> findByNombre(String term);

}
