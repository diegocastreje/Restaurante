package com.diego.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diego.models.entity.Mesa;

public interface IMesaDao extends JpaRepository<Mesa, Long>{

}
