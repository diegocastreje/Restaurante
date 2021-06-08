package com.diego.models.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="empleados")
public class Empleado{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="empleado_id")
	private Long id;
	
	@NotNull
	private String usuario;

	@NotNull	
	private String password;
	
	@NotNull
	private String nombre;

	private String apellido;
	
	@Email
	@NotNull
	@Column(unique = true)
	private String email;
	
	@NotNull
	private int salario;
	
	@NotNull
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name="empleados_roles", joinColumns = @JoinColumn(name="empleado_id"), 
	inverseJoinColumns = @JoinColumn(name="rol_id"))
	private Set<Rol> roles = new HashSet<>();
	
	public Empleado() {
	}

	public Empleado(String usuario, String password, String nombre, String apellido, @Email String email,
			@NotNull int salario) {
		super();
		this.usuario = usuario;
		this.password = password;
		this.nombre = nombre;
		this.apellido = apellido;
		this.email = email;
		this.salario = salario;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public Set<Rol> getRoles() {
		return roles;
	}

	public void setRoles(Set<Rol> roles) {
		this.roles = roles;
	}

}
