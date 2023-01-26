package com.example.Ecom.service;

import com.example.Ecom.model.Caracteristique;
import com.example.Ecom.model.Caracteristique;
import com.example.Ecom.model.Offre;
import com.example.Ecom.model.Produit;
import com.example.Ecom.repository.CaracteristiqueRepository;
import com.example.Ecom.repository.CaracteristiqueRepository;
import com.example.Ecom.repository.ProduitRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class CaracteristiqueService {

    private final CaracteristiqueRepository repository;
    private final ProduitRepository produitRepository;


    // Récuperer les caracteristiques d'un produit
    public List<Caracteristique> getCaracteristiquesOfProduit(Long idProduit){
        Produit produit = produitRepository.findById(idProduit).orElseThrow(() -> new IllegalStateException("Offre with id " + idProduit + " does not exist"));
        return repository.findAllByProduit(produit).orElseThrow(() -> new IllegalStateException("Offre with id " + idProduit + " does not exist"));
    }

    // Récuperer tous les caracteristiques ( admin ) avec recherche et filtre
    public Map<String,Object> getAllCaracteristique(String name, Integer page, String orderBy, String sortBy){

        int limit = 12;
        if(page < 0) page = 0;
        Pageable pageable = PageRequest.of(page, limit, Sort.by(Sort.Direction.fromString(sortBy), orderBy));


        List<Caracteristique>  caracteristiques;
        Long nbrResults;

        if(name!=""){
            caracteristiques = repository.findByNomProduit(name, pageable);
            nbrResults = repository.countByNomProduit(name);
        }
        else{
            caracteristiques = repository.findAll(pageable).getContent();
            nbrResults = repository.count();
        }

        Map<String,Object> map=new HashMap<>();
        nbrResults = (nbrResults / limit) + 1;
        map.put("caracteristiques",caracteristiques);
        map.put("nbrResults",nbrResults);
        return map;
    }

    // Récuperer un caracteristique avec son id
    public Caracteristique getCaracteristique(Long caracteristiqueId){
        return repository.findById(caracteristiqueId).orElseThrow(() -> new IllegalStateException("caracteristique with id " + caracteristiqueId + " does not exist"));
    }

    // Ajouter un caracteristique a un produit
    public Caracteristique createCaracteristique(Caracteristique caracteristique, Long idProduit) {
        Produit produit = produitRepository.findById(idProduit)
                    .orElseThrow(() -> new IllegalStateException("produit with id " + idProduit + " does not exist"));
        if(produit.getMinPrice() > caracteristique.getPrix() || produit.getMinPrice() == 0 ) {
            produit.setMinPrice(caracteristique.getPrix());
            produit.getOffre().setMinPrice(caracteristique.getPrix());
        }
        caracteristique.setProduit(produit);
        repository.save(caracteristique);
        return caracteristique;
    }

    // supprimer  un caracteristique
    public void deleteCaracteristique(Long caracteristiqueId){
        Caracteristique caracteristique = repository.findById(caracteristiqueId)
                .orElseThrow(() -> new IllegalStateException("caracteristique with id " + caracteristiqueId + " does not exist"));
        List<Caracteristique> tmp = caracteristique.getProduit().getCaracteristique();
        // get caracteristique with the lowest prix
        Caracteristique minCaracteristique = tmp.get(0);
        for(Caracteristique c : tmp){
            if(c.getPrix() < minCaracteristique.getPrix()) minCaracteristique = c;
        }

        if(minCaracteristique != null){
            caracteristique.getProduit().setMinPrice(minCaracteristique.getPrix());
            caracteristique.getProduit().getOffre().setMinPrice(minCaracteristique.getPrix());
        }
        else{
            caracteristique.getProduit().setMinPrice(0);
            caracteristique.getProduit().getOffre().setMinPrice(0);
        }

        repository.deleteById(caracteristiqueId);
    }

    // modifier un caracteristique
    public Caracteristique updateCaracteristique(Long caracteristiqueId, Caracteristique newCaracteristique){
        Caracteristique caracteristique = repository.findById(caracteristiqueId)
                .orElseThrow(() -> new IllegalStateException("caracteristique with id " + caracteristiqueId + " does not exists"));


            caracteristique.setCapacite(newCaracteristique.getCapacite());
            caracteristique.setPrix(newCaracteristique.getPrix());
            caracteristique.setColor(newCaracteristique.getColor());
            caracteristique.setDescription(newCaracteristique.getDescription());
            caracteristique.setQuantiteDispo(newCaracteristique.getQuantiteDispo());


        return caracteristique;
    }

}
