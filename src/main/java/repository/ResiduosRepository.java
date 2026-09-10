package com.ecosmartbin.repository;

import com.ecosmartbin.model.Residuo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResiduosRepository extends JpaRepository<Residuo, Long> {
}