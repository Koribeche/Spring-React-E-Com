package com.example.Ecom.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.example.Ecom.model.Offre;
import com.example.Ecom.model.Produit;
import com.example.Ecom.model.User;
import com.example.Ecom.repository.OffreRepository;
import com.example.Ecom.repository.ProduitRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ProduitService {

    private final ProduitRepository repository;
    private final OffreRepository offreRepository;

    @Value("${cloud.aws.bucket}")
    private String bucketName ;
    @Autowired
    private AmazonS3 s3Client;


    // Récuperer les produits d'une offre
    public List<Produit> getProduitsOfOffre(Long idOffre){
        Offre offre = offreRepository.findById(idOffre).orElseThrow(() -> new IllegalStateException("Offre with id " + idOffre + " does not exist"));
        return repository.findAllByOffre(offre).orElseThrow(() -> new IllegalStateException("Offre with id " + idOffre + " does not exist"));
    }

    // Récuperer tous les produits
    public Map<String,Object>  getAllProduits(String name, Integer page, String orderBy, String sortBy){
        int limit = 12;
        if(page < 0) page = 0;
        Pageable pageable = PageRequest.of(page, limit, Sort.by(Sort.Direction.fromString(sortBy), orderBy));

        List<Produit>  produits;
        Long nbrResults;
        if(name!=""){
            produits = repository.findByNomProduit(name, pageable);
            nbrResults = repository.countByNomProduit(name);
        }
        else{
            produits = repository.findAll(pageable).getContent();
            nbrResults = repository.count();
        }
        Map<String,Object> map=new HashMap<>();

        nbrResults = (nbrResults / limit) + 1;
        map.put("produits",produits);
        map.put("nbrResults",nbrResults);
        return map;
    }

    // Récuperer un produit avec son id
    public Produit getProduit(Long produitId){
        return repository.findById(produitId).orElseThrow(() -> new IllegalStateException("produit with id " + produitId + " does not exist"));
    }

    // Créer un produit ( et enregistrer la photo dans aws )
    public Produit createProduit(MultipartFile file, Produit produit, Long idOffre) throws IOException {
        Offre offre = offreRepository.findById(idOffre)
                    .orElseThrow(() -> new IllegalStateException("offre with id " + idOffre + " does not exist"));
        produit.setOffre(offre);
        produit.setPhotoProduit(uploadFile(file));
        repository.save(produit);
        return produit;
    }

    // Supprimer un produit ( et la photo correspondante )
    public void deleteProduit(Long produitId){
        Produit produit = repository.findById(produitId)
                .orElseThrow(() -> new IllegalStateException("produit with id " + produitId + " does not exist"));
        deleteObject(produit.getPhotoProduit().replace("https://springbootecom.s3.eu-west-3.amazonaws.com/",""));
        repository.deleteById(produitId);
    }

    // Update un produit ( et mettre a jours la photo si il le faut )
    public Produit updateProduit(Long produitId, Produit newProduit, MultipartFile file) throws IOException {
        Produit produit = repository.findById(produitId)
                .orElseThrow(() -> new IllegalStateException("produit with id " + produitId + " does not exists"));

        produit.setNomProduit(newProduit.getNomProduit());
        produit.setDescription(newProduit.getDescription());
        if(file != null){
            deleteObject(produit.getPhotoProduit().replace("https://springbootecom.s3.eu-west-3.amazonaws.com/",""));
            produit.setPhotoProduit(uploadFile(file));
        }
        return produit;
    }

    // Upload une photo dans aws
    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename().replace(" ", "_");
        File convertedFile = convertMultiPartToFile(file);
        PutObjectResult result =  s3Client.putObject(new PutObjectRequest(bucketName,fileName,convertedFile));
        String fileUrl = s3Client.getUrl(bucketName, fileName).toString();
        convertedFile.delete();
        return fileUrl;
    }

    // Convertir un MultipartFile en File
    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    // Supprimer un objet dans aws
    public String deleteObject(String fileName){
        s3Client.deleteObject(bucketName,fileName);
        return "File deleted successfully";
    }

}
