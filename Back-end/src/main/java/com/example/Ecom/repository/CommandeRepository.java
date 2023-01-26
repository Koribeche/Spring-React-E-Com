package com.example.Ecom.repository;

import com.example.Ecom.model.Commande;
import com.example.Ecom.model.Produit;
import com.example.Ecom.model.Role;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {


    @Query("SELECT c FROM Commande c WHERE c.statusCommande = ?1")
    List<Commande> findByStatusCommande(String statusCommande, Pageable pageable);

    @Query("SELECT COUNT(c) FROM Commande c WHERE c.statusCommande = ?1")
    Long  countByStatusCommande(String nomProduit);

}
