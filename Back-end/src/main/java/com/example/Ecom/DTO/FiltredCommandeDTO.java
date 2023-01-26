package com.example.Ecom.DTO;

import com.example.Ecom.model.Commande;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FiltredCommandeDTO {

    List<CommandeDTO> commandes;
    Long nbrPages;

    public FiltredCommandeDTO toFiltredCommandeDTO(List<CommandeDTO> commandes, Long nbrPages){
        return FiltredCommandeDTO.builder()
                .commandes(commandes)
                .nbrPages(nbrPages)
                .build();
    }


}
