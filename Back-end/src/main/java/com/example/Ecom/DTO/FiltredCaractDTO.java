package com.example.Ecom.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FiltredCaractDTO {

    List<CaracteristiqueDTO> caracteristiques;
    Long nbrPages;

    public FiltredCaractDTO toFiltredCaractDTO(List<CaracteristiqueDTO> caracteristiques, Long nbrPages){
        return FiltredCaractDTO.builder()
                .caracteristiques(caracteristiques)
                .nbrPages(nbrPages)
                .build();
    }


}
