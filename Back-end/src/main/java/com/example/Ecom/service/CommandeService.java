package com.example.Ecom.service;

import com.example.Ecom.model.*;
import com.example.Ecom.repository.AdresseRepository;
import com.example.Ecom.repository.CommandeRepository;
import com.example.Ecom.repository.PaiementRepository;
import com.example.Ecom.repository.ProduitRepository;
import com.google.gson.JsonSyntaxException;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.model.checkout.Session;
import com.stripe.net.ApiResource;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import javax.swing.*;
import javax.transaction.Transactional;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class CommandeService {

    private final CommandeRepository repository;
    private final PaiementRepository paiementRepository;
    private final ProduitPanierService produitPanierService;

    private final AdresseRepository adresseRepository;
    private final UserService userService;

    private final EmailSenderService emailSenderService;

    @Value("${stripe.apikey}")
    private String apiKey;

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    // construction du checkout
    public String checkout(HttpServletRequest request) throws StripeException, IOException {

        List<ProduitPanier> produitPaniers = produitPanierService.getProduitPaniersOfUser(request);
        List<Map<String, Object>> items = new ArrayList<>();
        for (ProduitPanier produitPanier : produitPaniers) {
            Map<String, Object> item = new HashMap<>();
            item.put("price_data", Map.of(
                    "currency", "eur",
                    "product_data", Map.of(
                            "name", produitPanier.getCaracteristique().getProduit().getNomProduit(),
                            "images", new String[]{produitPanier.getCaracteristique().getProduit().getPhotoProduit()}
                            // "description", produitPanier.getCaracteristique().getProduit().getDescription()
                    ),
                    "unit_amount", produitPanier.getCaracteristique().getPrix() * 100
            ));
            item.put("quantity", produitPanier.getQuantiteAchat());
            items.add(item);
        }

        Stripe.apiKey = apiKey;
        Map<String, Object> params = new HashMap<>();
        params.put("success_url", "http://localhost:3000/commande");
        params.put("cancel_url", "http://localhost:3000/failed");
        params.put("payment_method_types", List.of("card"));
        params.put("phone_number_collection", Map.of("enabled", true));
        params.put("shipping_address_collection", Map.of("allowed_countries", List.of("FR")));
        params.put("line_items", items);
        params.put("mode", "payment");
        Session session = Session.create(params);
        return session.getUrl();
    }

    // webhook pour la réponse renvoyer par stripe
    public void webhook(String payload, HttpServletRequest request) throws Exception {
        // get header Stripe-Signature
        String sigHeader = request.getHeader("Stripe-Signature");
        Event event = null;
        String endpointSecret = webhookSecret;

        try {
            event = Webhook.constructEvent(
                    payload, sigHeader, endpointSecret
            );
        } catch (JsonSyntaxException e) {
            // Invalid payload
            throw new JsonSyntaxException("Invalid payload");
        } catch (SignatureVerificationException e) {
            // Invalid signature
            throw new SignatureVerificationException("Invalid signature",sigHeader);
        }

        // Deserialize the nested object inside the event
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        StripeObject stripeObject = null;
        if (dataObjectDeserializer.getObject().isPresent()) {
            stripeObject = dataObjectDeserializer.getObject().get();
        } else {
            throw new IllegalStateException(
                    String.format("Unable to deserialize event data object for s"));
        }

        // Handle the event
        switch (event.getType()) {
            case "checkout.session.completed": {
                try{
                    fullfillOrder(stripeObject);
                }
                catch(Exception e){
                    System.out.println(e.getMessage());
                    throw new Exception("Error while fullfilling order");
                }
                break;
            }
            case "charge.failed":{
                System.out.println("charge.failed");
                break;
            }
            // ... handle other event types
            default:
                System.out.println("Unhandled event type: " + event.getType());
        }
    }

    // rembourser une commande
    public void refund(){
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
        System.out.println("cc");
    }

    // valider une commande après le paiement
    public void fullfillOrder   (StripeObject stripeObject) {
        Session session = (Session) stripeObject;

        Commande commande = new Commande();
        User user = userService.findUserByEmail(session.getCustomerDetails().getEmail());
        commande.setUser(user);
        List<ProduitPanier> produitPaniers = new ArrayList<>();
        user.getProduitPanier().forEach(produitPanier -> {
            if(produitPanier.getStatusPanier().equals("en cours")){
                produitPaniers.add(produitPanier);
                produitPanier.getCaracteristique().setQuantiteDispo(produitPanier.getCaracteristique().getQuantiteDispo() - produitPanier.getQuantiteAchat());
                produitPanier.setStatusPanier("Paied");
                produitPanier.setCommande(commande);
            }
        });

        commande.setProduitPanier(produitPaniers);
        Paiement paiement = new Paiement();
        paiement.setCommande(commande);
        paiement.setPaiementIntent(session.getPaymentIntent());
        paiement.setStatusPaiement("Paied");
        commande.setStatusCommande("En préparation de livraison");
        commande.setPrixTotal(session.getAmountTotal() / 100);
        Adresse adresse = new Adresse();
        adresse.setCodePostal(session.getShippingDetails().getAddress().getPostalCode());
        adresse.setLine1(session.getShippingDetails().getAddress().getLine1());
        adresse.setLine2(session.getShippingDetails().getAddress().getLine2());
        adresse.setCity(session.getShippingDetails().getAddress().getCity());
        adresse.setPays(session.getShippingDetails().getAddress().getCountry());
        adresse.setUser(user);
        int saveNewAdresse = 0;
        List<Adresse> adresses = user.getAdresses();
        for (Adresse a : adresses) {
            if (a.equals(adresse)) {
                saveNewAdresse = 1;
                commande.setAdresse(a);
            }
        }
        if (saveNewAdresse == 0) {
            adresse.setUser(user);
            adresseRepository.save(adresse);
            commande.setAdresse(adresse);
        }

        emailSenderService.sendEmail(commande.getUser().getEmail(), "Update commande amir shop", "Votre commande a été prise en charge, elle est en cours de préparation, vous pouvez vérifier l'état de la commande a tous moment sur notre site");


        repository.save(commande);
        paiementRepository.save(paiement);

        System.out.println("checkout.session.completed");

    }

    // Récuperer les commandes de l'utilisateur connecté
    public List<Commande> getCommandesOfUser(HttpServletRequest request){
        String email = request.getUserPrincipal().getName();
        User user = userService.findUserByEmail(email);
        return user.getCommandes();
    }

    // Récuperer toutes les commandes du site ( admin ) avec filtres et recherche par mot clé
    public Map<String,Object> getAllCommande(String name, Integer page, String orderBy, String sortBy){

        int limit = 12;
        if(page < 0) page = 0;
        Pageable pageable = PageRequest.of(page, limit, Sort.by(Sort.Direction.fromString(sortBy), orderBy));

        List<Commande>  commandes;
        Long nbrResults;
        if(name!=""){
            commandes = repository.findByStatusCommande(name, pageable);
            nbrResults = repository.countByStatusCommande(name);
        }
        else{
            commandes = repository.findAll(pageable).getContent();
            nbrResults = repository.count();
        }
        Map<String,Object> map=new HashMap<>();

        nbrResults = (nbrResults / limit) + 1;
        map.put("commandes",commandes);
        map.put("nbrResults",nbrResults);
        return map;
    }

    // Récuperer une commande par son id
    public Commande getCommande(Long commandeId){
        return repository.findById(commandeId).orElseThrow(() -> new IllegalStateException("commande with id " + commandeId + " does not exist"));
    }

    // Supprimer une commande
    public void deleteCommande(Long commandeId){
        boolean exists = repository.existsById(commandeId);
        if(!exists){
            throw new IllegalStateException("commande with id " + commandeId + " does not exists");
        }
        repository.deleteById(commandeId);
    }

    // Modifier le status d'une commande
    public Commande updateCommande(Long commandeId, Commande newCommande){
        Commande commande = repository.findById(commandeId)
                .orElseThrow(() -> new IllegalStateException("commande with id " + commandeId + " does not exists"));


        commande.setStatusCommande(newCommande.getStatusCommande());
        emailSenderService.sendEmail(commande.getUser().getEmail(), "Update commande amir shop", "Votre commande a été modifiée, vous pouvez la consulter sur votre compte");

        return commande;
    }

}