package com.ecosmartbin.controller;

import com.ecosmartbin.model.Residuo;
import com.ecosmartbin.service.ResiduoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/residuos")
public class ResiduoController {

    @Autowired
    private ResiduoService residuoService;

    @GetMapping
    public List<Residuo> obtenerResiduos() {
        return residuoService.listarResiduos();
    }

    @PostMapping
    public Residuo crearResiduo(@RequestBody Residuo residuo) {
        return residuoService.guardarResiduo(residuo);
    }
}