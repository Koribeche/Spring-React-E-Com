package com.example.Ecom.repository;

import com.example.Ecom.model.Offre;
import com.example.Ecom.model.Produit;
import com.example.Ecom.model.ProduitPanier;
import com.example.Ecom.model.Role;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProduitPanierRepository extends JpaRepository<ProduitPanier, Long> {


    @Query("SELECT p FROM ProduitPanier p, User u WHERE p.statusPanier = 'en cours' AND p.user.idUser = u.idUser AND u.email = ?1")
    List<ProduitPanier> findNotBought(String email);

}
