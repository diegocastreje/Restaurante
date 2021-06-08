package com.diego.models.services;

import java.util.List;

import com.diego.models.entity.Mesa;

public interface IMesaService {
	
	public List<Mesa> findAll();
	
	public Mesa save(Mesa mesa);
	
	public Mesa findById(Long id);
	
	public void deleteMesaById(Long id);

}
