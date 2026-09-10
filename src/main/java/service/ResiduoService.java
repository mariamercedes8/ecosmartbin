package com.ecosmartbin.service;

import com.ecosmartbin.model.Residuo;
import com.ecosmartbin.repository.ResiduosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResiduoService {

    @Autowired
    private ResiduosRepository residuosRepository;

    public List<Residuo> listarResiduos() {
        return residuosRepository.findAll();
    }

    public Residuo guardarResiduo(Residuo residuo) {
        return residuosRepository.save(residuo);
    }
}