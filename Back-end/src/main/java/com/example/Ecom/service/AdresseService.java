package com.example.Ecom.service;

import com.example.Ecom.model.Adresse;
import com.example.Ecom.model.User;
import com.example.Ecom.repository.AdresseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.List;


@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class AdresseService {

    private final AdresseRepository repository;
    private final UserService userService;


    // Récuperer les adresses de l'utilisateur connecté
    public List<Adresse> getAdressesOfUser(HttpServletRequest request){
        String email = request.getUserPrincipal().getName();
        User user = userService.findUserByEmail(email);
        return user.getAdresses();
    }

    public List<Adresse> getAllAdresses(){
        return repository.findAll();
    }

    public Adresse getAdresse(Long adresseId){
        return repository.findById(adresseId).orElseThrow(() -> new IllegalStateException("adresse with id " + adresseId + " does not exist"));
    }

    public Adresse createAdresse(Adresse adresse, HttpServletRequest request) {
        try{
            String email = request.getUserPrincipal().getName();
            User user = userService.findUserByEmail(email);
            adresse.setUser(user);
            return repository.save(adresse);
        }
        catch (Exception e){
            return null;
        }

    }

    public void deleteAdresse(Long adresseId){
        boolean exists = repository.existsById(adresseId);
        if(!exists){
            throw new IllegalStateException("adresse with id " + adresseId + " does not exists");
        }
        repository.deleteById(adresseId);
    }

    public Adresse updateAdresse(Long adresseId, Adresse newAdresse){
        Adresse adresse = repository.findById(adresseId)
                .orElseThrow(() -> new IllegalStateException("adresse with id " + adresseId + " does not exists"));

        if(newAdresse.getLine1() != null && newAdresse.getLine1().length() > 0 && !adresse.getLine1().equals(newAdresse.getLine1())){
            adresse.setLine1(newAdresse.getLine1());
        }
        if(newAdresse.getLine2() != null && newAdresse.getLine2().length() > 0 && !adresse.getLine2().equals(newAdresse.getLine2())){
            adresse.setLine2(newAdresse.getLine2());
        }

        if(newAdresse.getCity() != null && newAdresse.getCity().length() > 0 && !adresse.getCity().equals(newAdresse.getCity())){
            adresse.setCity(newAdresse.getCity());
        }

        if(newAdresse.getCodePostal() != null && newAdresse.getCodePostal().length() > 0 && !adresse.getCodePostal().equals(newAdresse.getCodePostal())){
            adresse.setCodePostal(newAdresse.getCodePostal());
        }

        if(newAdresse.getPays() != null && newAdresse.getPays().length() > 0 && !adresse.getPays().equals(newAdresse.getPays())){
            adresse.setPays(newAdresse.getPays());
        }

        return adresse;
    }

}
