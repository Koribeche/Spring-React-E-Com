package com.example.Ecom.repository;

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
public interface ProduitRepository extends JpaRepository<Produit, Long> {

    Optional<List<Produit>> findAllByOffre(Offre offre);

    @Query("SELECT p FROM Produit p WHERE p.nomProduit = ?1")
    List<Produit>  findByNomProduit(String nomProduit, Pageable pageable);

    @Query("SELECT COUNT(p) FROM Produit p WHERE p.nomProduit = ?1")
    Long  countByNomProduit(String nomProduit);
}
