package com.example.Ecom.controlleur;

import com.example.Ecom.DTO.RoleDTO;
import com.example.Ecom.model.Role;
import com.example.Ecom.service.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/role")
@AllArgsConstructor
public class RoleController {

    private final RoleService roleService;


    @GetMapping
    public RoleDTO getRole(String name){
        Role role =  roleService.getRole(name);
        return new RoleDTO().toRoleDTO(role);
    }

    @PostMapping
    public RoleDTO createRole(@RequestBody Role role){
        Role newRole =  roleService.createRole(role);
        return new RoleDTO().toRoleDTO(newRole);
    }



}
