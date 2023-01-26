package com.example.Ecom.controlleur;

import com.example.Ecom.model.Offre;
import com.example.Ecom.model.Role;
import com.example.Ecom.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController()
@RequestMapping(path = "/storage")
public class StorageController {

    @Autowired
    private StorageService storageService;

    @PostMapping("/uploadFile")
    public String uploadFile(@RequestParam("file") MultipartFile file ) throws IOException {
        String fileName = storageService.uploadFile(file);
        return fileName;
    }

    @DeleteMapping("/{fileName}")
    public String deleteFile(@PathVariable("fileName") String fileName){
        return storageService.deleteObject(fileName);
    }

    @GetMapping ("/download/{fileName}")
    public byte[] downloadFile(@PathVariable("fileName") String fileName){
        return storageService.downloadObject(fileName);
    }


}
