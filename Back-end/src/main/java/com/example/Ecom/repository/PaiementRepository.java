package com.example.Ecom.repository;

import com.example.Ecom.model.Paiement;
import com.example.Ecom.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Long> {

    Optional<Paiement> findByPaiementIntent(String paiementIntent);

}
