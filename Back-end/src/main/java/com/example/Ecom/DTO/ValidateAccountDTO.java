package com.example.Ecom.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ValidateAccountDTO {

    private String newPassword;
    private String oldPassword;
    private String email;

}
