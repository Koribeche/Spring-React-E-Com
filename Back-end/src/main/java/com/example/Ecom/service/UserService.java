package com.example.Ecom.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.Ecom.DTO.RegisterDTO;
import com.example.Ecom.DTO.ValidateAccountDTO;
import com.example.Ecom.model.Adresse;
import com.example.Ecom.model.Caracteristique;
import com.example.Ecom.model.Role;
import com.example.Ecom.repository.AdresseRepository;
import com.example.Ecom.repository.RoleRepository;
import com.example.Ecom.repository.UserRepository;

import com.example.Ecom.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Strings;
import io.jsonwebtoken.JwtException;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.Transient;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.security.SecureRandom;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository repository;
    private final RoleRepository roleRepository;
    private final AdresseRepository adresseRepository;
    private final PasswordEncoder passwordEncoder;

    private final EmailSenderService emailSenderService;

    // Récuperer un utilisateur avec son email ( utiliser pour valider l'authentification jwt )
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = repository.findUserByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(String.format("User with email %s not found", email))
                );
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

    public User findUserByEmail(String email) {
        return repository.findUserByEmail(email).orElseThrow(() -> new IllegalStateException("User with email " + email + " does not exist"));
    }

    // refresh le token jwt
    public void refreshToken(HttpServletRequest request , HttpServletResponse response) throws IOException {

        String authorizationHeader = request.getHeader("Authorization");
        if (Strings.isNullOrEmpty(authorizationHeader) || !authorizationHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Refresh Token Failed");
        }

        try {
            String refresh_token = authorizationHeader.replace("Bearer ", "");
            Algorithm algorithm = Algorithm.HMAC256("secretsecretsecretsecretsecret".getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(refresh_token);
            String username = decodedJWT.getSubject();

            org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) loadUserByUsername(username);

            String access_token = JWT.create()
                    .withSubject(user.getUsername())
                    .withClaim("roles", user.getAuthorities().stream().map(grantedAuthority -> grantedAuthority.getAuthority()).collect(Collectors.toList()))
                    .withIssuedAt(new Date())
                    .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 10))
                    .withIssuer(request.getRequestURL().toString())
                    .sign(algorithm);

            Map<String,String> tokens = new HashMap<>();
            tokens.put("access_token",access_token);
            tokens.put("refresh_token",refresh_token);
            response.setContentType("application/json");
            new ObjectMapper().writeValue(response.getOutputStream(),tokens);

        } catch (JwtException | IOException e) {
            Map<String,String> error = new HashMap<>();
            error.put("error_message",e.getMessage());
            response.setContentType("application/json");
            response.setStatus(401);
            new ObjectMapper().writeValue(response.getOutputStream(),error);
        }
    }

    // Ajouter un role a un utilisateur
    public User addRoleToUser(String email, String roleName) {
        User user = repository.findUserByEmail(email).orElseThrow(() -> new IllegalStateException("Student with username " + email + " does not exist"));
        Role role = roleRepository.findByName(roleName).orElseThrow(() -> new IllegalStateException("Role with name " + roleName + " does not exist"));
        user.getRoles().add(role);
        return user;
    }

    // Récuperer tous les user du site
    public Map<String,Object> getUsers(String name, String role,Integer page, String orderBy, String sortBy){
        int limit = 12;
        if(page < 0) page = 0;
        Pageable pageable = PageRequest.of(page, limit, Sort.by(Sort.Direction.fromString(sortBy), orderBy));


        List<User>  users;
        Long nbrResults;


        Role role1 = roleRepository.findByName(role).orElse(null);

        if(name != "" && role != ""){
            users = repository.findUsersByEmailOrPrenomOrNomUserAndRoles(name,name,name,role1,pageable);
            nbrResults = repository.countUsersByEmailOrPrenomOrNomUserAndRoles(name,name,name,role1);
        }
        else{
            if(name != ""){
                users = repository.findUsersByEmailOrPrenomOrNomUser(name,name,name,pageable);
                nbrResults = repository.countUsersByEmailOrPrenomOrNomUser(name,name,name);
            }
            else{
                if(role != ""){
                    users = repository.findUsersByRoles_Name(role,pageable);
                    nbrResults = repository.countUsersByRoles_Name(role);
                }
                else{
                    users = repository.findAll(pageable).getContent();
                    nbrResults = repository.count();
                }
            }
        }

        Map<String,Object> map=new HashMap<>();
        nbrResults = (nbrResults / limit) + 1;
        map.put("users",users);
        map.put("nbrResults",nbrResults);
        return map;
    }

    // Récuperer un user avec son id
    public User getUser(Long userId){
        return repository.findById(userId).orElseThrow(() -> new IllegalStateException("Student with id " + userId + " does not exist"));
    }

    // Récuperer l'utilisateur connecter
    public User getMe(HttpServletRequest request){
        String email = request.getUserPrincipal().getName();
        return repository.findUserByEmail(email).orElseThrow(() -> new IllegalStateException("Student with email " + email + " does not exist"));
    }

    // Créer un utilisateur ( envoie d'un mail de validation )
    public User createUser(RegisterDTO registerDTO){
        User user = new User();
        user.setEmail(registerDTO.getEmail());

        repository.findUserByEmail(user.getEmail())
                .ifPresent(s -> {
                    throw new IllegalStateException("email taken");
                });


        user.setNomUser(registerDTO.getNom());
        user.setPrenom(registerDTO.getPrenom());
        Adresse adresse = new Adresse();
        adresse.setLine1(registerDTO.getLine1());
        adresse.setLine2(registerDTO.getLine2());
        adresse.setCity(registerDTO.getCity());
        adresse.setCodePostal(registerDTO.getCodePostal());
        adresse.setPays(registerDTO.getPays());
        adresse.setUser(user);
        Role role = roleRepository.findByName("ROLE_USER").orElseThrow(() -> new IllegalStateException("ROLE_USER does not exist"));
        user.getAdresses().add(adresse);
        user.getRoles().add(role);

        User res = repository.save(user);
        adresseRepository.save(adresse);
        if(user.getEmail().equals("admin@gmail.com")){
            user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
            return res;
        }
        emailSenderService.sendEmail(user.getEmail(),"Please Activate your Account", "Thank you for signing up to Amir Shop " +
                "please click on the below url to activate your account : " +
                "http://localhost:3000/accountVerification/" + user.getEmail() + "\n use this password: " + user.getPassword());


        return res;

    }


    public void resetPassword(String email){
        // generate random password

        char[] possibleCharacters = (new String("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?")).toCharArray();
        String randomStr = RandomStringUtils.random( 15, 0, possibleCharacters.length-1, false, false, possibleCharacters, new SecureRandom() );

        User user = repository.findUserByEmail(email).orElseThrow(() -> new IllegalStateException("Student with username " + email + " does not exist"));
        user.setPassword(randomStr);
        repository.save(user);
        emailSenderService.sendEmail(user.getEmail(),"Reset your password", "Please click on the below url to reset your password : " +
                "http://localhost:3000/accountVerification/" + user.getEmail() + "\n use this password: " + user.getPassword());
    }

    // Activer un utilisateur et mettre a jours son mot de passe
    public void validateUser(ValidateAccountDTO validateAccountDTO){
        String oldPassword = validateAccountDTO.getOldPassword();
        String newPassword = validateAccountDTO.getNewPassword();
        String email = validateAccountDTO.getEmail();
        User user = repository.findUserByEmail(email).orElseThrow(() -> new IllegalStateException("Student with email " + email + " does not exist"));
        if (user.getPassword().equals(oldPassword)) {
            user.setPassword(passwordEncoder.encode(newPassword));
            repository.save(user);
            emailSenderService.sendEmail(user.getEmail(),"Mise a jours du compte", "votre compte est désormais accessible");
        } else {
            throw new IllegalStateException("Wrong Password");
        }
    }

    // Supprimer le compte d'un user
    public void deleteUser(Long userId){
        boolean exists = repository.existsById(userId);
        if(!exists){
            throw new IllegalStateException("student with id " + userId + " does not exists");
        }
        repository.deleteById(userId);
    }

    // mettre a jours les informations d'un user
    public User updateUser(Long userId, User newUser){
        User user = repository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("student with id " + userId + " does not exists"));

        if(newUser.getNomUser() != null && newUser.getNomUser().length() > 0 && !newUser.getNomUser().equals(newUser.getNomUser())){
            user.setNomUser(newUser.getNomUser());
        }

        if(newUser.getPrenom() != null && newUser.getPrenom().length() > 0 && !newUser.getPrenom().equals(newUser.getPrenom())){
            user.setPrenom(newUser.getPrenom());
        }

        if(newUser.getEmail() != null && newUser.getEmail().length() > 0 && !newUser.getEmail().equals(newUser.getEmail())){
            repository.findUserByEmail(newUser.getEmail())
                    .ifPresent(s -> {
                        throw new IllegalStateException("email taken");
                    });
            user.setEmail(newUser.getEmail());
        }

        return user;
    }

}
