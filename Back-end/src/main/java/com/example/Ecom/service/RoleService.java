package com.example.Ecom.service;

import com.example.Ecom.repository.RoleRepository;
import com.example.Ecom.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    private final RoleRepository repository;

    @Autowired
    public RoleService(RoleRepository repository) {
        this.repository = repository;
    }

    // Récuperer le role d'un user
    public Role getRole(String name){
        return repository.findByName(name).orElseThrow(() -> new IllegalStateException("Student with id " + name + " does not exist"));
    }

    // Créer un role
    public Role createRole(Role role){
        return repository.save(role);
    }

}
