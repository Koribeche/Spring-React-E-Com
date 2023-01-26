package com.example.Ecom.DTO;


import com.example.Ecom.model.*;
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
public class UserDTO {


    private Long idUser;

    private String nomUser;

    private String prenom;

    private String email;

    private List<RoleDTO> roles = new ArrayList<>();

    private List<OffreDTO> offres = new ArrayList<>();

    private List<AdresseDTO> adresses = new ArrayList<>();

    private List<ProduitPanierDTO> produitPanier = new ArrayList<>();

    private List<CommandeDTO> commande = new ArrayList<>();


    public UserDTO toUserDTO(User user){
        List<RoleDTO> rolesTmp = new ArrayList<>();
        List<OffreDTO> offreTmp = new ArrayList<>();
        List<AdresseDTO> adresseTmp = new ArrayList<>();
        List<CommandeDTO> commandeTmp = new ArrayList<>();
        List<ProduitPanierDTO> produitPanierTmp = new ArrayList<>();

        user.getRoles().forEach(role -> rolesTmp.add(new RoleDTO().toRoleDTO(role)));
        user.getOffres().forEach(offre -> offreTmp.add(new OffreDTO().toOffreDTO(offre)));
        user.getAdresses().forEach(adresse -> adresseTmp.add(new AdresseDTO().toAdresseDTO(adresse)));
        user.getCommandes().forEach(commande -> commandeTmp.add(new CommandeDTO().toCommandeDTO(commande)));
        user.getProduitPanier().forEach(produitPanier -> produitPanierTmp.add(new ProduitPanierDTO().toProduitPanierDTO(produitPanier)));

        return UserDTO.builder()
                .roles(rolesTmp)
                .offres(offreTmp)
                .adresses(adresseTmp)
                .commande(commandeTmp)
                .email(user.getEmail())
                .prenom(user.getPrenom())
                .idUser(user.getIdUser())
                .nomUser(user.getNomUser())
                .produitPanier(produitPanierTmp)
                .build();

    }


    public User toUser(UserDTO userDTO){
        List<Role> rolesTmp = new ArrayList<>();
        List<Offre> offreTmp = new ArrayList<>();
        List<Adresse> adresseTmp = new ArrayList<>();
        List<Commande> commandeTmp = new ArrayList<>();
        List<ProduitPanier> produitPanierTmp = new ArrayList<>();

        userDTO.getRoles().forEach(role -> rolesTmp.add(new RoleDTO().toRole(role)));
        userDTO.getOffres().forEach(offre -> offreTmp.add(new OffreDTO().toOffre(offre)));
        userDTO.getAdresses().forEach(adresse -> adresseTmp.add(new AdresseDTO().toAdresse(adresse)));
        userDTO.getCommande().forEach(commande -> commandeTmp.add(new CommandeDTO().toCommande(commande)));
        userDTO.getProduitPanier().forEach(produitPanier -> produitPanierTmp.add(new ProduitPanierDTO().toProduitPanier(produitPanier)));

        return User.builder()
                .roles(rolesTmp)
                .offres(offreTmp)
                .adresses(adresseTmp)
                .commandes(commandeTmp)
                .email(userDTO.getEmail())
                .prenom(userDTO.getPrenom())
                .idUser(userDTO.getIdUser())
                .nomUser(userDTO.getNomUser())
                .produitPanier(produitPanierTmp)
                .build();
    }
}
