package com.example.Ecom.DTO;

import com.example.Ecom.model.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommandeDTO {

    private Long idCommande;

    private AdresseDTO adresse;

    private Long prixTotal;

    private PaiementDTO paiement;

    private List<ProduitPanierDTO> produitPanier = new ArrayList<>();

    private String statusCommande;

    public CommandeDTO toCommandeDTO(Commande commande){
        List<ProduitPanierDTO> produitPanierTmp = new ArrayList<>();
        commande.getProduitPanier().forEach(panier -> produitPanierTmp.add(new ProduitPanierDTO().toProduitPanierDTO(panier)));

        return CommandeDTO.builder()
                .idCommande(commande.getIdCommande())
                .adresse(new AdresseDTO().toAdresseDTO(commande.getAdresse()))
                .paiement(new PaiementDTO().toPaiementDTO(commande.getPaiement()))
                .produitPanier(produitPanierTmp)
                .prixTotal(commande.getPrixTotal())
                .statusCommande(commande.getStatusCommande())
                .build();
    }


    public Commande toCommande(CommandeDTO commandeDTO){
        List<ProduitPanier> produitPanierTmp = new ArrayList<>();
        commandeDTO.getProduitPanier().forEach(panier -> produitPanierTmp.add(new ProduitPanierDTO().toProduitPanier(panier)));

        return Commande.builder()
                .idCommande(commandeDTO.getIdCommande())
                .adresse(new AdresseDTO().toAdresse(commandeDTO.getAdresse()))
                .paiement(new PaiementDTO().toPaiement(commandeDTO.getPaiement()))
                .produitPanier(produitPanierTmp)
                .prixTotal(commandeDTO.getPrixTotal())
                .statusCommande(commandeDTO.getStatusCommande())
                .build();
    }

}

