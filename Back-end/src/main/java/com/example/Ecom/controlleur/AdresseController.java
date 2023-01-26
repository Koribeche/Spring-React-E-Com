package com.example.Ecom.controlleur;

import com.example.Ecom.DTO.AdresseDTO;
import com.example.Ecom.model.Adresse;
import com.example.Ecom.service.AdresseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import lombok.AllArgsConstructor;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/adresse")
@AllArgsConstructor
public class AdresseController {

    private final AdresseService adresseService;

    @GetMapping(path = "/all")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public List<AdresseDTO> getAllAdresses(){

        List<AdresseDTO> adressesDTO = new ArrayList<>();
        adresseService.getAllAdresses().forEach(adresse -> {
            adressesDTO.add(new AdresseDTO().toAdresseDTO(adresse));
        });
        return adressesDTO;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public List<AdresseDTO> getAdressesOfUser(HttpServletRequest request){

        List<AdresseDTO> adressesDTO = new ArrayList<>();
        adresseService.getAdressesOfUser(request).forEach(adresse -> {
            adressesDTO.add(new AdresseDTO().toAdresseDTO(adresse));
        });
        return adressesDTO;
    }


    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity<AdresseDTO> createAdresse(@RequestBody Adresse adresse, HttpServletRequest request) {

        Adresse newAdresse =  adresseService.createAdresse(adresse,request);
        return ResponseEntity.status(201).body(new AdresseDTO().toAdresseDTO(newAdresse));

    }


    @GetMapping(path = "{adresseId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public AdresseDTO getAdresse(@PathVariable("adresseId") Long adresseId){
        Adresse adresse =  adresseService.getAdresse(adresseId);
        return new AdresseDTO().toAdresseDTO(adresse);
    }

    @DeleteMapping(path = "{adresseId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity deleteAdresse(@PathVariable("adresseId") Long adresseId){
        adresseService.deleteAdresse(adresseId);
        return ResponseEntity.status(204).build();
    }

    @PutMapping(path = "{adresseId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public AdresseDTO updateAdresse( @PathVariable("adresseId") Long adresseId,@RequestBody Adresse adresse){
        Adresse newAdresse = adresseService.updateAdresse(adresseId, adresse);
        return new AdresseDTO().toAdresseDTO(newAdresse);
    }
}
