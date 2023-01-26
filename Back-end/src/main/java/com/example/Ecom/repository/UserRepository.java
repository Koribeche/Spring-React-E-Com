package com.example.Ecom.repository;

import com.example.Ecom.model.Role;
import com.example.Ecom.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByEmail(String email);

    List<User> findUsersByEmailOrPrenomOrNomUserAndRoles(String email, String prenom, String nomUser, Role roles, Pageable pageable);

    Long countUsersByEmailOrPrenomOrNomUserAndRoles(String email, String prenom, String nomUser, Role roles);

    List<User> findUsersByEmailOrPrenomOrNomUser(String email, String prenom, String nomUser, Pageable pageable);

    Long countUsersByEmailOrPrenomOrNomUser(String email, String prenom, String nomUser);

    /* @Query("SELECT u FROM User u WHERE u.email LIKE %?1% OR u.nomUser LIKE %?1% OR u.prenom LIKE %?1%")
    List<User> findUserByEmailOrNomUserOrPrenom(String text, Pageable pageable);

    @Query("SELECT COUNT(u) FROM User u WHERE u.email LIKE %?1% OR u.nomUser LIKE %?1% OR u.prenom LIKE %?1%")
    Long  countByEmailOrNomUserOrPrenom(String text); */

    List<User> findUsersByRoles_Name(String roleName, Pageable pageable);

    Long countUsersByRoles_Name(String roleName);


}
