package com.diego.models.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diego.models.dao.IEmpleadoDao;
import com.diego.models.entity.Empleado;

@Service
@Transactional
public class EmpleadoServiceImpl implements IEmpleadoService{
	
	@Autowired
	private IEmpleadoDao empleadoDao;

	@Override
	@Transactional(readOnly = true)
	public List<Empleado> findAll() {
		return (List<Empleado>) empleadoDao.findAll();
	}

	@Override
	public Empleado save(Empleado empleado) {
		return empleadoDao.save(empleado);
	}

	@Override
	public void delete(Long id) {
		empleadoDao.deleteById(id);
	}

	@Override
	@Transactional(readOnly = true)
	public Empleado findById(Long id) {
		return empleadoDao.findById(id).orElse(null);
	}
	
	public Optional<Empleado> getByUsuario(String usuario){
		return empleadoDao.findByUsuario(usuario);
	}
	
	public boolean existsByUsuario(String usuario) {
		return empleadoDao.existsByUsuario(usuario);
	}
	
	public boolean existsByEmail(String email) {
		return empleadoDao.existsByEmail(email);
	}

}
