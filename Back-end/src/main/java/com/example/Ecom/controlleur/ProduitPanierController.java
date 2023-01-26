package com.example.Ecom.controlleur;

import com.example.Ecom.DTO.ProduitPanierDTO;
import com.example.Ecom.model.ProduitPanier;
import com.example.Ecom.service.ProduitPanierService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/panier")
@AllArgsConstructor
public class ProduitPanierController {

    private final ProduitPanierService produitService;


    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public List<ProduitPanierDTO> getProduitPaniersOfUser(HttpServletRequest request){
        List<ProduitPanierDTO> produitPanierDTO = new ArrayList<>();
        produitService.getProduitPaniersOfUser(request).forEach(panierPanier -> {
            produitPanierDTO.add(new ProduitPanierDTO().toProduitPanierDTO(panierPanier));
        });
        return produitPanierDTO;
    }


    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity<ProduitPanierDTO> createProduitPanier(@RequestBody ProduitPanier produit, @RequestParam(required = true) Long idCaracteristique,HttpServletRequest request) {
        try{
            ProduitPanier newProduitPanier =  produitService.createProduitPanier(produit,idCaracteristique,request);
            return ResponseEntity.status(201).body(new ProduitPanierDTO().toProduitPanierDTO(newProduitPanier));
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }


    @GetMapping(path = "{produitId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ProduitPanierDTO getProduitPanier(@PathVariable("produitId") Long produitId){
        ProduitPanier newProduitPanier =  produitService.getProduitPanier(produitId);
        return new ProduitPanierDTO().toProduitPanierDTO(newProduitPanier);
    }

    @DeleteMapping(path = "{produitId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity deleteProduitPanier(@PathVariable("produitId") Long produitId){
        produitService.deleteProduitPanier(produitId);
        return ResponseEntity.status(204).build();
    }
}
