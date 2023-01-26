package com.example.Ecom.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class StorageService  {

    @Value("${cloud.aws.bucket}")
    private String bucketName ;

    @Autowired
    private AmazonS3 s3Client;

    // envoyer un fichier sur le bucket s3
    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File convertedFile = convertMultiPartToFile(file);
        PutObjectResult result =  s3Client.putObject(new PutObjectRequest(bucketName,fileName,convertedFile));
        System.out.println(result);
        // get url of the file
        String fileUrl = s3Client.getUrl(bucketName, fileName).toString();
        System.out.println(fileUrl);
        convertedFile.delete();
        return fileUrl;
    }

    // télécharger un fichier en byte sur le serveur (non utilisé)
    public byte[] downloadObject(String fileName){
        S3Object s3Object = s3Client.getObject(bucketName,fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            byte[] content = IOUtils.toByteArray(inputStream);
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Supprimer un fichier de aws
    public String deleteObject(String fileName){
        s3Client.deleteObject(bucketName,fileName);
        return "File deleted successfully";
    }

    // Convertir un multipart file en file
    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
}
