package com.example.Ecom.DTO;

import com.example.Ecom.model.Paiement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaiementDTO {

    private Long idPaiement;
    private String statusPaiement;
    private String paiementIntent;


    public PaiementDTO toPaiementDTO(Paiement paiement){
        return PaiementDTO.builder()
                .idPaiement(paiement.getIdPaiement())
                .statusPaiement(paiement.getStatusPaiement())
                .paiementIntent(paiement.getPaiementIntent())
                .build();
    }

    public Paiement toPaiement(PaiementDTO paiementDTO){
        return Paiement.builder()
                .idPaiement(paiementDTO.getIdPaiement())
                .statusPaiement(paiementDTO.getStatusPaiement())
                .paiementIntent(paiementDTO.getPaiementIntent())
                .build();
    }
}
