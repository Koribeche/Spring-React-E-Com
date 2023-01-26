package com.example.Ecom.DTO;

import com.example.Ecom.model.Adresse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdresseDTO {

    private Long idAdresse;

    private String line1;

    private String line2;

    private String city;

    private String pays;

    private String codePostal;

    public AdresseDTO toAdresseDTO(Adresse adresse){
        return AdresseDTO.builder()
                .idAdresse(adresse.getIdAdresse())
                .line1(adresse.getLine1())
                .line2(adresse.getLine2())
                .city(adresse.getCity())
                .pays(adresse.getPays())
                .codePostal(adresse.getCodePostal())
                .build();
    }

    public Adresse toAdresse(AdresseDTO adresseDTO){
        return Adresse.builder()
                .idAdresse(adresseDTO.getIdAdresse())
                .line1(adresseDTO.getLine1())
                .line2(adresseDTO.getLine2())
                .city(adresseDTO.getCity())
                .pays(adresseDTO.getPays())
                .codePostal(adresseDTO.getCodePostal())
                .build();
    }



}
