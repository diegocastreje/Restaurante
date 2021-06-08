package com.diego.models.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="mesas")
public class Mesa implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name="fecha")
	@Temporal(TemporalType.DATE)
	private Date fecha;
	 
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="mesa")
	private List<ProductoMesa> productos;

	public Mesa() {
		super();
	}
	
	@PrePersist
	public void prePersist() {
		this.fecha = new Date();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
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
