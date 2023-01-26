package com.example.Ecom.service;

import com.example.Ecom.model.Caracteristique;
import com.example.Ecom.model.ProduitPanier;
import com.example.Ecom.model.User;
import com.example.Ecom.repository.CaracteristiqueRepository;
import com.example.Ecom.repository.ProduitPanierRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ProduitPanierService {

    private final ProduitPanierRepository repository;
    private final CaracteristiqueRepository caracteristiqueRepository;
    private final UserService userService;


    // récuperer le panier de l'utilisateur connecté
    public List<ProduitPanier> getProduitPaniersOfUser(HttpServletRequest request) {
        String email = request.getUserPrincipal().getName();
        User user = userService.findUserByEmail(email);
        List<ProduitPanier> produitPaniers = repository.findNotBought(user.getEmail());
        return produitPaniers;
    }

    // Récuperer un produit avec son id
    public ProduitPanier getProduitPanier(Long produitPanierId) {
        return repository.findById(produitPanierId).orElseThrow(() -> new IllegalStateException("produitPanier with id " + produitPanierId + " does not exist"));
    }

    // Ajouter un produit au panier
    public ProduitPanier createProduitPanier(ProduitPanier produitPanier, Long idCaracteristique, HttpServletRequest request) {

        List<ProduitPanier> produitPaniers = getProduitPaniersOfUser(request);
        for (ProduitPanier produitPanier1 : produitPaniers) {
            if (produitPanier1.getCaracteristique().getIdCaracteristique().equals(idCaracteristique)) {
                produitPanier1.setQuantiteAchat(produitPanier.getQuantiteAchat());
                repository.save(produitPanier1);
                return produitPanier1;
            }
        }

        Caracteristique caracteristique = caracteristiqueRepository.findById(idCaracteristique)
                .orElseThrow(() -> new IllegalStateException("caracteristique with id " + idCaracteristique + " does not exist"));

        if (caracteristique.getQuantiteDispo() < produitPanier.getQuantiteAchat()) {
            throw new IllegalStateException("quantite disponible insuffisante");
        }

        if (produitPanier.getQuantiteAchat() <= 0) {
            throw new IllegalStateException("quantite achat doit etre superieur a 0");
        }

        String email = request.getUserPrincipal().getName();
        User user = userService.findUserByEmail(email);

        produitPanier.setCaracteristique(caracteristique);
        produitPanier.setUser(user);
        repository.save(produitPanier);
        return produitPanier;
    }

    // Supprimer un produit du panier
    public void deleteProduitPanier(Long produitPanierId) {
        boolean exists = repository.existsById(produitPanierId);
        if (!exists) {
            throw new IllegalStateException("produitPanier with id " + produitPanierId + " does not exists");
        }
        repository.deleteById(produitPanierId);
    }

}

