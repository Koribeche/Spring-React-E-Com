package com.example.Ecom.DTO;

import com.example.Ecom.model.Caracteristique;
import com.example.Ecom.model.Produit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProduitDTO {

    private Long id;
    private String nomProduit;
    private String description;
    private String photoProduit;
    private int minPrice;

    private List<CaracteristiqueDTO> caracteristiques = new ArrayList<>();

    public ProduitDTO toProduitDTO(Produit produit){
        List<CaracteristiqueDTO> caracteristiqueTmp = new ArrayList<>();
        produit.getCaracteristique().forEach(caract -> caracteristiqueTmp.add(new CaracteristiqueDTO().toCaracteristiqueDTO(caract)));
        return ProduitDTO.builder()
                .id(produit.getIdProduit())
                .nomProduit(produit.getNomProduit())
                .description(produit.getDescription())
                .photoProduit(produit.getPhotoProduit())
                .minPrice(produit.getMinPrice())
                .caracteristiques(caracteristiqueTmp)
                .build();
    }

    public Produit toProduit(ProduitDTO produitDTO){
        List<Caracteristique> caracteristiqueTmp = new ArrayList<>();
        produitDTO.getCaracteristiques().forEach(caract -> caracteristiqueTmp.add(new CaracteristiqueDTO().toCaracteristique(caract)));
        return Produit.builder()
                .idProduit(produitDTO.getId())
                .nomProduit(produitDTO.getNomProduit())
                .description(produitDTO.getDescription())
                .photoProduit(produitDTO.getPhotoProduit())
                .minPrice(produitDTO.getMinPrice())
                .caracteristique(caracteristiqueTmp)
                .build();
    }

}
