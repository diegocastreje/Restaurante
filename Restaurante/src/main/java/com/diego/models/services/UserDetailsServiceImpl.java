package com.diego.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.diego.models.entity.Empleado;
import com.diego.models.entity.EmpleadoPrincipal;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	@Autowired
	private EmpleadoServiceImpl empleadoService;
	
	@Override
	public UserDetails loadUserByUsername(String usuario) throws UsernameNotFoundException {
		Empleado empleado = empleadoService.getByUsuario(usuario).get();
		return EmpleadoPrincipal.build(empleado);
	}

}
