package com.example.Ecom.controlleur;

import com.example.Ecom.DTO.FiltredOffreDTO;
import com.example.Ecom.DTO.FiltredProduitDTO;
import com.example.Ecom.DTO.OffreDTO;
import com.example.Ecom.DTO.ProduitDTO;
import com.example.Ecom.model.Offre;
import com.example.Ecom.model.Produit;
import com.example.Ecom.service.ProduitService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(path = "/produit")
@AllArgsConstructor
public class ProduitController {

    private final ProduitService produitService;

    @GetMapping(path = "/all")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public FiltredProduitDTO getAllProduits(@RequestParam(required = false) String name,
                                                @RequestParam(required = true) Integer page,
                                                @RequestParam(required = false) String orderBy,
                                                @RequestParam(required = false) String sortBy){

        List<ProduitDTO> produitDTO = new ArrayList<>();
        Map<String,Object> map = produitService.getAllProduits(name, page, orderBy, sortBy );
        List<Produit> produits = (List<Produit>) map.get("produits");
        Long nbrPages = (Long) map.get("nbrResults");
        produits.forEach(produit -> {
            produitDTO.add(new ProduitDTO().toProduitDTO(produit));
        });
        FiltredProduitDTO res = new FiltredProduitDTO().toFiltredOffreDTO(produitDTO, nbrPages);
        return res;
    }

    @GetMapping
    public List<ProduitDTO> getProduitsOfOffre(@RequestParam(required = true) Long idOffre){
        List<ProduitDTO> produitDTO = new ArrayList<>();
        produitService.getProduitsOfOffre(idOffre).forEach(produit -> {
            produitDTO.add(new ProduitDTO().toProduitDTO(produit));
        });
        return produitDTO;
    }


    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<ProduitDTO> createProduit(@RequestParam("file") MultipartFile file, @ModelAttribute Produit produit, @RequestParam(required = true) Long idOffre) {
        try{
            Produit newProduit =  produitService.createProduit(file,produit,idOffre);
            return ResponseEntity.ok(new ProduitDTO().toProduitDTO(newProduit));
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }


    @GetMapping(path = "{produitId}")
    public ProduitDTO getProduit(@PathVariable("produitId") Long produitId){
        Produit produit = produitService.getProduit(produitId);
        return new ProduitDTO().toProduitDTO(produit);
    }


    @DeleteMapping(path = "{produitId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity deleteProduit(@PathVariable("produitId") Long produitId){
        produitService.deleteProduit(produitId);
        return ResponseEntity.status(204).build();
    }


    @PutMapping(path = "{produitId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public ProduitDTO updateProduit( @PathVariable("produitId") Long produitId,@RequestParam(value="file", required = false) MultipartFile file, @ModelAttribute Produit produit) throws IOException {
        Produit newProduit =  produitService.updateProduit(produitId, produit,file);
        return new ProduitDTO().toProduitDTO(newProduit);
    }
}
