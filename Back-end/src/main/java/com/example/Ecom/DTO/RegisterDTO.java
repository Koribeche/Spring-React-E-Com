package com.example.Ecom.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterDTO {
    private String email;
    private String password;
    private String nom;
    private String prenom;
    private String line1;
    private String line2;
    private String codePostal;
    private String city;
    private String pays;

}
