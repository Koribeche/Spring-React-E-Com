package com.example.Ecom.repository;

import com.example.Ecom.model.Offre;
import com.example.Ecom.model.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OffreRepository extends JpaRepository<Offre, Long>{

    // find offre by nomOffre or marque
    @Query("SELECT o FROM Offre o WHERE o.nomOffre = ?1 AND o.marque = ?2")
    List<Offre>  findByNomOffreAndMarque(String nomOffre, String marque,Pageable pageable);

    @Query("SELECT o FROM Offre o WHERE o.nomOffre = ?1")
    List<Offre>  findByNomOffre(String nomOffre,Pageable pageable);

    @Query("SELECT o FROM Offre o WHERE o.marque = ?1")
    List<Offre>  findByMarque(String marque,Pageable pageable);

    @Query("SELECT COUNT(o) FROM Offre o WHERE o.nomOffre = ?1 AND o.marque = ?2")
    Long  countByNomOffreAndMarque(String nomOffre, String marque);

    @Query("SELECT COUNT(o) FROM Offre o WHERE o.nomOffre = ?1")
    Long  countByNomOffre(String nomOffre);

    @Query("SELECT COUNT(o) FROM Offre o WHERE o.marque = ?1")
    Long  countByMarque(String marque);


    /* @Query("SELECT o FROM Offre o")
    List<Offre>  findByNomOffreAndMarque(Pageable pageable); */


}
