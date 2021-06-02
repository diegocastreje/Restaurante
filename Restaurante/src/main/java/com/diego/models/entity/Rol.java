package com.diego.models.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.diego.security.enums.RolNombre;

@Entity
@Table(name="roles")
public class Rol implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private RolNombre nombre;

	public Rol() {}

	public Rol(Long id, @NotNull RolNombre nombre) {
		super();
		this.id = id;
		this.nombre = nombre;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public RolNombre getNombre() {
		return nombre;
	}

	public void setNombre(RolNombre nombre) {
		this.nombre = nombre;
	}

	private static final long serialVersionUID = 1L;
}
