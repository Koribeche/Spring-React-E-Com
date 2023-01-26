package com.example.Ecom.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.example.Ecom.model.Offre;
import com.example.Ecom.model.User;
import com.example.Ecom.repository.OffreRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;


@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class OffreService {

    private final OffreRepository repository;
    private final UserService userService;
    @Value("${cloud.aws.bucket}")
    private String bucketName ;
    @Autowired
    private AmazonS3 s3Client;



    public Map<String,Object> getOffres(String name, String marque, Integer page, String orderBy, String sortBy) {

        int limit = 12;
        if(page < 0) page = 0;
        if(orderBy == null) orderBy = "idOffre";
        if(sortBy == null) sortBy = "DESC";
        Pageable pageable = PageRequest.of(page, limit, Sort.by(Sort.Direction.fromString(sortBy), orderBy));


        List<Offre>  offres;
        Long nbrResults;

        if( name!="" && marque!=""){
            offres = repository.findByNomOffreAndMarque(name, marque, pageable);
            nbrResults = repository.countByNomOffreAndMarque(name, marque);
        }
        else {
            if(name != "" && marque == ""){
                System.out.println("name");
                offres = repository.findByNomOffre(name, pageable);
                nbrResults = repository.countByNomOffre(name);
            }
            else if(marque != ""){
                offres = repository.findByMarque(marque, pageable);
                nbrResults = repository.countByMarque(marque);
            }
            else{
                offres = repository.findAll(pageable).getContent();
                nbrResults = repository.count();
            }
        }
        Map<String,Object> map=new HashMap<>();

        nbrResults = (nbrResults / limit) + 1;
        map.put("offres",offres);
        map.put("nbrResults",nbrResults);

        return map;
    }

    public Offre getOffre(Long offreId){
        return repository.findById(offreId).orElseThrow(() -> new IllegalStateException("offre with id " + offreId + " does not exist"));
    }

    public Offre createOffre(MultipartFile file, Offre offre, HttpServletRequest request) throws IOException {
            String email = request.getUserPrincipal().getName();
            User user = userService.findUserByEmail(email);
            offre.setUser(user);
            offre.setPhotoOffre(uploadFile(file));
            return repository.save(offre);
    }

    public void deleteOffre(Long offreId){
        boolean exists = repository.existsById(offreId);
        if(!exists){
            throw new IllegalStateException("offre with id " + offreId + " does not exists");
        }
        repository.deleteById(offreId);
    }

    public Offre updateOffre(Long offreId, Offre newOffre, MultipartFile file) throws IOException {
        Offre offre = repository.findById(offreId)
                .orElseThrow(() -> new IllegalStateException("offre with id " + offreId + " does not exists"));

        offre.setNomOffre(newOffre.getNomOffre());
        offre.setDescription(newOffre.getDescription());

        offre.setCategorie(newOffre.getCategorie());
        offre.setMarque(newOffre.getMarque());

        if(file != null){
            deleteObject(offre.getPhotoOffre().replace("https://springbootecom.s3.eu-west-3.amazonaws.com/",""));
            offre.setPhotoOffre(newOffre.getPhotoOffre());
            offre.setPhotoOffre(uploadFile(file));
        }

        return offre;
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
