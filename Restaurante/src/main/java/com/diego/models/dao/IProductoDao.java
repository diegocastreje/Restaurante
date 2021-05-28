package com.diego.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diego.models.entity.Producto;

public interface IProductoDao extends JpaRepository<Producto, Long>{

}
