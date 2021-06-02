package com.diego.models.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diego.models.dao.IRolDao;
import com.diego.models.entity.Rol;
import com.diego.security.enums.RolNombre;

@Service
@Transactional
public class RolServiceImpl {

	@Autowired
	IRolDao rolDao;
	
	public Optional<Rol> getByNombre(RolNombre nombre){
		return rolDao.findByNombre(nombre);
	}
}
