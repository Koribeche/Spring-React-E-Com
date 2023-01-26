package com.example.Ecom.DTO;

import com.example.Ecom.model.Caracteristique;
import com.example.Ecom.model.Commande;
import com.example.Ecom.model.ProduitPanier;
import com.example.Ecom.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProduitPanierDTO {


    private Long idProduitPanier;
    private int quantiteAchat;
    private String nomProduit;
    private String photoProduit;
    private String statusPanier;
    private CaracteristiqueDTO caracteristique;

    public ProduitPanierDTO toProduitPanierDTO(ProduitPanier produitPanier){
        return ProduitPanierDTO.builder()
                .idProduitPanier(produitPanier.getIdProduitPanier())
                .quantiteAchat(produitPanier.getQuantiteAchat())
                .nomProduit(produitPanier.getCaracteristique().getProduit().getNomProduit())
                .photoProduit(produitPanier.getCaracteristique().getProduit().getPhotoProduit())
                .statusPanier(produitPanier.getStatusPanier())
                .caracteristique(new CaracteristiqueDTO().toCaracteristiqueDTO(produitPanier.getCaracteristique()))
                .build();
    }

    public ProduitPanier toProduitPanier(ProduitPanierDTO produitPanierDTO){
        return ProduitPanier.builder()
                .idProduitPanier(produitPanierDTO.getIdProduitPanier())
                .quantiteAchat(produitPanierDTO.getQuantiteAchat())
                .statusPanier(produitPanierDTO.getStatusPanier())
                .caracteristique(produitPanierDTO.getCaracteristique().toCaracteristique(produitPanierDTO.getCaracteristique()))
                .build();
    }

}
