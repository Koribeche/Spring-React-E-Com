package com.example.Ecom.DTO;

import com.example.Ecom.model.Offre;
import com.example.Ecom.model.Produit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OffreDTO {

    private Long idOffre;

    private String nomOffre;

    private String photoOffre;

    private String description;

    private int minPrice;

    private String categorie;

    private String marque;

    private Date creationTime;

    private Date modificationTime;

    private List<ProduitDTO> produits = new ArrayList<>();

    public OffreDTO toOffreDTO(Offre offre){
        List<ProduitDTO> produitsTmp = new ArrayList<>();
        offre.getProduits().forEach(produit -> produitsTmp.add(new ProduitDTO().toProduitDTO(produit)));
        return OffreDTO.builder()
                .idOffre(offre.getIdOffre())
                .nomOffre(offre.getNomOffre())
                .photoOffre(offre.getPhotoOffre())
                .description(offre.getDescription())
                .minPrice(offre.getMinPrice())
                .categorie(offre.getCategorie())
                .marque(offre.getMarque())
                .creationTime(offre.getCreationTime())
                .modificationTime(offre.getModificationTime())
                .produits(produitsTmp)
                .build();

    }

    public Offre toOffre(OffreDTO offreDTO){
        List<Produit> produitsTmp = new ArrayList<>();
        offreDTO.getProduits().forEach(produit -> produitsTmp.add(new ProduitDTO().toProduit(produit)));
        return Offre.builder()
                .idOffre(offreDTO.getIdOffre())
                .nomOffre(offreDTO.getNomOffre())
                .photoOffre(offreDTO.getPhotoOffre())
                .description(offreDTO.getDescription())
                .minPrice(offreDTO.getMinPrice())
                .categorie(offreDTO.getCategorie())
                .marque(offreDTO.getMarque())
                .creationTime(offreDTO.getCreationTime())
                .modificationTime(offreDTO.getModificationTime())
                .produits(produitsTmp)
                .build();
    }

}
