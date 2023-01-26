package com.example.Ecom.controlleur;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.example.Ecom.DTO.AdresseDTO;
import com.example.Ecom.DTO.FiltredOffreDTO;
import com.example.Ecom.DTO.OffreDTO;
import com.example.Ecom.model.Offre;
import com.example.Ecom.model.User;
import com.example.Ecom.service.OffreService;
import com.example.Ecom.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/offre")
@AllArgsConstructor
public class OffreController {

    private final OffreService offreService;
    private final UserService userService;



    @GetMapping
    public FiltredOffreDTO getOffres(@RequestParam(required = false) String name,
                                     @RequestParam(required = false) String marque,
                                     @RequestParam(required = true) Integer page,
                                     @RequestParam(required = false) String orderBy,
                                     @RequestParam(required = false) String sortBy) {
        List<OffreDTO> offreDTO = new ArrayList<>();
        Map<String,Object> map = offreService.getOffres(name, marque, page, orderBy, sortBy );
        List<Offre> offres = (List<Offre>) map.get("offres");
        Long nbrPages = (Long) map.get("nbrResults");
        offres.forEach(offre -> {
            offreDTO.add(new OffreDTO().toOffreDTO(offre));
        });
        FiltredOffreDTO res = new FiltredOffreDTO().toFiltredOffreDTO(offreDTO, nbrPages);
        return res;
    }



    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<OffreDTO> createOffre(@RequestParam("file") MultipartFile file,  @ModelAttribute Offre offre, HttpServletRequest request) {
        try{
            Offre newOffre =  offreService.createOffre(file,offre,request);
            return ResponseEntity.status(201).body(new OffreDTO().toOffreDTO(newOffre));
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }




    @GetMapping(path = "{offreId}")
    public OffreDTO getOffre(@PathVariable("offreId") Long offreId){
        Offre offre =  offreService.getOffre(offreId);
        return new OffreDTO().toOffreDTO(offre);
    }

    @DeleteMapping(path = "{offreId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity deleteOffre(@PathVariable("offreId") Long offreId){
        offreService.deleteOffre(offreId);
        return ResponseEntity.status(204).build();
    }

    @PutMapping(path = "{offreId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public OffreDTO updateOffre( @PathVariable("offreId") Long offreId,@RequestParam(value="file", required = false) MultipartFile file, @ModelAttribute Offre offre) throws IOException {
        Offre newOffre =  offreService.updateOffre(offreId, offre,file);
        return new OffreDTO().toOffreDTO(newOffre);
    }
}
