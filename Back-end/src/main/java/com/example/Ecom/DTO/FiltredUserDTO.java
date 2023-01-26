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
public class FiltredUserDTO {

    List<UserDTO> users;
    Long nbrPages;

    public FiltredUserDTO toFiltredUserDTO(List<UserDTO> users, Long nbrPages){
        return FiltredUserDTO.builder()
                .users(users)
                .nbrPages(nbrPages)
                .build();
    }


}
