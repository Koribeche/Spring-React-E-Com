package com.example.Ecom.repository;

import com.example.Ecom.model.Caracteristique;
import com.example.Ecom.model.Offre;
import com.example.Ecom.model.Produit;
import com.example.Ecom.model.Role;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CaracteristiqueRepository extends JpaRepository<Caracteristique, Long> {


    Optional<List<Caracteristique>> findAllByProduit(Produit produit);


    @Query("SELECT c FROM  Caracteristique  c, Produit p WHERE p.nomProduit = ?1 AND c.produit = p")
    List<Caracteristique>  findByNomProduit(String nomProduit, Pageable pageable);

    @Query("SELECT COUNT(c) FROM Produit p, Caracteristique  c WHERE p.nomProduit = ?1 AND c.produit = p")
    Long  countByNomProduit(String nomProduit);

}
