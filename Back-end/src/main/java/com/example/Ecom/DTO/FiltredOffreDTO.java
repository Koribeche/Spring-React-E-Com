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
public class FiltredOffreDTO {

    List<OffreDTO> offres;
    Long nbrPages;

    public FiltredOffreDTO toFiltredOffreDTO(List<OffreDTO> offres, Long nbrPages){
        return FiltredOffreDTO.builder()
                .offres(offres)
                .nbrPages(nbrPages)
                .build();
    }


}
