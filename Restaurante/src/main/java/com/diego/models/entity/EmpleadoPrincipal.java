package com.diego.models.entity;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class EmpleadoPrincipal implements UserDetails{
	
	private String usuario; 
	private String password; 
	private String nombre; 
	private String apellido; 
	private String email; 
	private int salario; 
	private Collection<? extends GrantedAuthority> authorities;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}
	
	public EmpleadoPrincipal(String usuario, String password, String nombre, String apellido, String email,
			int salario, Collection<? extends GrantedAuthority> authorities) {
		this.usuario = usuario;
		this.password = password;
		this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
		this.salario = salario;
		this.authorities = authorities;
	}
	
	public static EmpleadoPrincipal build(Empleado empleado) {
		List<GrantedAuthority> authorities = 
				empleado.getRoles().stream().map(rol -> new SimpleGrantedAuthority(rol
						.getNombre().name())).collect(Collectors.toList());
		return new EmpleadoPrincipal(empleado.getUsuario(), empleado.getPassword(), empleado.getNombre(), empleado.getApellido(), empleado.getEmail(), empleado.getSalario(), authorities); 
	}
	
	@Override
	public String getPassword() {
		return password;
	}
	@Override
	public String getUsername() {
		return usuario;
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return true;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellido() {
		return apellido;
	}
	public void setApellido(String apellido) {
		this.apellido = apellido;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getSalario() {
		return salario;
	}
	public void setSalario(int salario) {
		this.salario = salario;
	} 
	
}
