package com.example.Ecom.controlleur;

import com.example.Ecom.DTO.CommandeDTO;
import com.example.Ecom.DTO.FiltredCommandeDTO;
import com.example.Ecom.DTO.FiltredOffreDTO;
import com.example.Ecom.DTO.OffreDTO;
import com.example.Ecom.model.Commande;
import com.example.Ecom.model.Offre;
import com.example.Ecom.service.CommandeService;
import com.google.common.io.CharStreams;
import com.google.gson.JsonSyntaxException;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.model.checkout.Session;
import com.stripe.net.ApiResource;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/commande")
@AllArgsConstructor
public class CommandeController {

    private final CommandeService commandeService;


    @GetMapping(path="/checkout")
    public String checkout(HttpServletRequest request ,HttpServletResponse response) throws StripeException, IOException {
        String url = commandeService.checkout(request);
        // redirect user to url
        System.out.println(url);
        return url;
        //response.sendRedirect(url);
    }

    // create webhook for stripe
    @PostMapping(path = "/webhook")
    public ResponseEntity<String> webhook(@RequestBody String payload, HttpServletRequest request) throws StripeException, IOException {
        try{
            commandeService.webhook(payload,request);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(path = "/all")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public FiltredCommandeDTO getAllCommande(@RequestParam(required = false) String name,
                                             @RequestParam(required = true) Integer page,
                                             @RequestParam(required = false) String orderBy,
                                             @RequestParam(required = false) String sortBy){
        List<CommandeDTO> commandeDTO = new ArrayList<>();
        Map<String,Object> map = commandeService.getAllCommande(name, page, orderBy, sortBy );
        List<Commande> commandes = (List<Commande>) map.get("commandes");
        Long nbrPages = (Long) map.get("nbrResults");
        commandes.forEach(commande -> {
            commandeDTO.add(new CommandeDTO().toCommandeDTO(commande));
        });
        FiltredCommandeDTO res = new FiltredCommandeDTO().toFiltredCommandeDTO(commandeDTO, nbrPages);
        return res;
    }


    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public List<CommandeDTO> getCommandesOfUser(HttpServletRequest request){
        List<CommandeDTO> commandeDTO = new ArrayList<>();
        commandeService.getCommandesOfUser(request).forEach(commande -> {
            commandeDTO.add(new CommandeDTO().toCommandeDTO(commande));
        });
        return commandeDTO;
    }

    @GetMapping(path = "{commandeId}")
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public CommandeDTO getCommande(@PathVariable("commandeId") Long commandeId){
        Commande commande =  commandeService.getCommande(commandeId);
        return new CommandeDTO().toCommandeDTO(commande);
    }


    @DeleteMapping(path = "{commandeId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity deleteCommande(@PathVariable("commandeId") Long commandeId){
        try{
            commandeService.deleteCommande(commandeId);
            return ResponseEntity.status(204).build();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }


    @PutMapping(path = "{commandeId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public CommandeDTO updateCommande( @PathVariable("commandeId") Long commandeId,@RequestBody Commande commande){
        Commande newCommande = commandeService.updateCommande(commandeId, commande);
        return new CommandeDTO().toCommandeDTO(newCommande);
    }
}