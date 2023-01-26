package com.example.Ecom.controlleur;


import com.example.Ecom.DTO.CaracteristiqueDTO;
import com.example.Ecom.DTO.FiltredCaractDTO;
import com.example.Ecom.DTO.FiltredOffreDTO;
import com.example.Ecom.DTO.OffreDTO;
import com.example.Ecom.model.Caracteristique;
import com.example.Ecom.model.Offre;
import com.example.Ecom.service.CaracteristiqueService;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/caracteristique")
@AllArgsConstructor
public class CaracteristiqueController {

    private final CaracteristiqueService caracteristiqueService;


    @GetMapping(path = "/all")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public FiltredCaractDTO getAllCaracteristique(@RequestParam(required = false) String name,
                                                  @RequestParam(required = true) Integer page,
                                                  @RequestParam(required = false) String orderBy,
                                                  @RequestParam(required = false) String sortBy){

        List<CaracteristiqueDTO> caracteristiqueDTO = new ArrayList<>();
        Map<String,Object> map = caracteristiqueService.getAllCaracteristique(name, page, orderBy, sortBy );
        List<Caracteristique> caracteristiques = (List<Caracteristique>) map.get("caracteristiques");
        Long nbrPages = (Long) map.get("nbrResults");
        caracteristiques.forEach(caract -> {
            caracteristiqueDTO.add(new CaracteristiqueDTO().toCaracteristiqueDTO(caract));
        });
        FiltredCaractDTO res = new FiltredCaractDTO().toFiltredCaractDTO(caracteristiqueDTO, nbrPages);
        return res;
    }


    @GetMapping
    public List<CaracteristiqueDTO> getCaracteristiquesOfProduit(@RequestParam(required = true) Long idProduit){
        List<CaracteristiqueDTO> caracteristiqueDTO = new ArrayList<>();
        caracteristiqueService.getCaracteristiquesOfProduit(idProduit).forEach(caracteristique -> {
            caracteristiqueDTO.add(new CaracteristiqueDTO().toCaracteristiqueDTO(caracteristique));
        });
        return caracteristiqueDTO;
    }


    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<CaracteristiqueDTO> createCaracteristique(@RequestBody Caracteristique caracteristique, @RequestParam(required = true) Long idProduit) {
        try{
            Caracteristique newCaracteristique =  caracteristiqueService.createCaracteristique(caracteristique,idProduit);
            return ResponseEntity.status(201).body(new CaracteristiqueDTO().toCaracteristiqueDTO(newCaracteristique));
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }


    @GetMapping(path = "{caracteristiqueId}")
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public CaracteristiqueDTO getCaracteristique(@PathVariable("caracteristiqueId") Long caracteristiqueId){
        Caracteristique caracteristique = caracteristiqueService.getCaracteristique(caracteristiqueId);
        return new CaracteristiqueDTO().toCaracteristiqueDTO(caracteristique);
    }


    @DeleteMapping(path = "{caracteristiqueId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity deleteCaracteristique(@PathVariable("caracteristiqueId") Long caracteristiqueId){
        caracteristiqueService.deleteCaracteristique(caracteristiqueId);
        return ResponseEntity.status(204).build();
    }


    @PutMapping(path = "{caracteristiqueId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public CaracteristiqueDTO updateCaracteristique( @PathVariable("caracteristiqueId") Long caracteristiqueId,@RequestBody Caracteristique caracteristique){
        Caracteristique newCaracteristique = caracteristiqueService.updateCaracteristique(caracteristiqueId, caracteristique);
        return new CaracteristiqueDTO().toCaracteristiqueDTO(newCaracteristique);
    }
}
