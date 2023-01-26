package com.example.Ecom.DTO;

import com.example.Ecom.model.Caracteristique;
import com.example.Ecom.model.Produit;
import com.example.Ecom.model.ProduitPanier;

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
public class CaracteristiqueDTO {

    private Long idCaracteristique;
    private String description;
    private String color;
    private String capacite;
    private int prix;
    private int quantiteDispo;
    private Long idProduit;
    private String nomProduit;

    // private ProduitDTO produit;


    public CaracteristiqueDTO toCaracteristiqueDTO(Caracteristique caracteristique){
        return CaracteristiqueDTO.builder()
                .idCaracteristique(caracteristique.getIdCaracteristique())
                .description(caracteristique.getDescription())
                .color(caracteristique.getColor())
                .capacite(caracteristique.getCapacite())
                .prix(caracteristique.getPrix())
                .quantiteDispo(caracteristique.getQuantiteDispo())
                .idProduit(caracteristique.getProduit().getIdProduit())
                .nomProduit(caracteristique.getProduit().getNomProduit())
                // .produit(new ProduitDTO().toProduitDTO(caracteristique.getProduit()))
                .build();
    }


    public Caracteristique toCaracteristique(CaracteristiqueDTO caracteristiqueDTO){
        return Caracteristique.builder()
                .idCaracteristique(caracteristiqueDTO.getIdCaracteristique())
                .description(caracteristiqueDTO.getDescription())
                .color(caracteristiqueDTO.getColor())
                .capacite(caracteristiqueDTO.getCapacite())
                .prix(caracteristiqueDTO.getPrix())
                .quantiteDispo(caracteristiqueDTO.getQuantiteDispo())
                // .produit(caracteristiqueDTO.getProduit().toProduit(caracteristiqueDTO.getProduit()))
                .build();
    }


}
