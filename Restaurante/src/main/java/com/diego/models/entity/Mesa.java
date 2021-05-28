package com.diego.models.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="mesas")
public class Mesa implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@JsonIgnoreProperties(value = {"mesas","hibernateLazyInitializer","handler"}, allowSetters = true)
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="empleado")
	private Empleado empleado;
	 
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="mesa")
	private List<ProductoMesa> productos;

	public Mesa() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Empleado getEmpleado() {
		return empleado;
	}

	public void setEmpleado(Empleado empleado) {
		this.empleado = empleado;
	}

	public List<ProductoMesa> getProductos() {
		return productos;
	}

	public void setProductos(List<ProductoMesa> productos) {
		this.productos = productos;
	}
	
	public Double getTotal() {
		Double total = 0.0;
		for(ProductoMesa producto : productos) {
			total += producto.getImporte();
		}
		return total;
	}

	private static final long serialVersionUID = 1L;
}
