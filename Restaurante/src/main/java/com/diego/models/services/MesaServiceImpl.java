package com.diego.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diego.models.dao.IMesaDao;
import com.diego.models.entity.Mesa;
import com.diego.models.entity.Producto;

@Service
public class MesaServiceImpl implements IMesaService{
	
	@Autowired
	private IMesaDao mesaDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Mesa> findAll() {
		return (List<Mesa>) mesaDao.findAll();
	}

	@Override
	public Mesa save(Mesa mesa) {
		return mesaDao.save(mesa);
	}

	@Override
	@Transactional(readOnly = true)
	public Mesa findById(Long id) {
		return mesaDao.findById(id).orElse(null);
	}

	@Override
	public void deleteMesaById(Long id) {
		System.out.println(id);
		mesaDao.deleteById(id);
	}

}
