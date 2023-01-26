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
public class FiltredProduitDTO {

    List<ProduitDTO> produits;
    Long nbrPages;

    public FiltredProduitDTO toFiltredOffreDTO(List<ProduitDTO> produits, Long nbrPages){
        return FiltredProduitDTO.builder()
                .produits(produits)
                .nbrPages(nbrPages)
                .build();
    }


}
