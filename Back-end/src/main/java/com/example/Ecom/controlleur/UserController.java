package com.example.Ecom.controlleur;

import com.example.Ecom.DTO.*;
import com.example.Ecom.model.Caracteristique;
import com.example.Ecom.model.User;
import com.example.Ecom.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.boot.configurationprocessor.json.JSONArray;
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
@RequestMapping(path = "/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public FiltredUserDTO getUsers(@RequestParam(required = false) String name,
                                   @RequestParam(required = false) String role,
                                  @RequestParam(required = true) Integer page,
                                  @RequestParam(required = false) String orderBy,
                                  @RequestParam(required = false) String sortBy){
        List<UserDTO> userDTO =  new ArrayList<>();

        Map<String,Object> map = userService.getUsers(name, role, page, orderBy, sortBy );
        List<User> users = (List<User>) map.get("users");
        Long nbrPages = (Long) map.get("nbrResults");
        users.forEach(user -> {
            userDTO.add(new UserDTO().toUserDTO(user));
        });

        FiltredUserDTO res = new FiltredUserDTO().toFiltredUserDTO(userDTO, nbrPages);
        return res;
    }


    @PostMapping(path="/addRole")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserDTO> addRoleToUser(@RequestBody RoleToUserForm form){
        User user = userService.addRoleToUser(form.getEmail(),form.getRoleName());
        return ResponseEntity.status(201).body(new UserDTO().toUserDTO(user));
    }

    @GetMapping(path="/getMe")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<UserDTO> getMe(HttpServletRequest request){
        try{
            User user = userService.getMe(request);
            return ResponseEntity.status(200).body(new UserDTO().toUserDTO(user));
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping(path="/signup")
    public ResponseEntity<UserDTO> createUser(@RequestBody RegisterDTO registerDTO){
        User newUser =  userService.createUser(registerDTO);
        return ResponseEntity.status(201).body(new UserDTO().toUserDTO(newUser));
    }

    @PostMapping(path="/reset")
    public ResponseEntity resetPassword(@RequestBody ResetPasswordForm resetPasswordForm){
        userService.resetPassword(resetPasswordForm.getEmail());
        return ResponseEntity.status(204).build();
    }

    @PostMapping(path="/validateAccount")
    public ResponseEntity validateAccount(@RequestBody ValidateAccountDTO validateAccountDTO){
        userService.validateUser(validateAccountDTO);
        return ResponseEntity.status(204).build();
    }

    @GetMapping("/token/refresh")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public void refreshToken(HttpServletRequest request , HttpServletResponse response) throws IOException {
        userService.refreshToken(request , response);
    }


    @GetMapping(path = "{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public UserDTO getUser(@PathVariable("userId") Long userId){
        User user = userService.getUser(userId);
        return new UserDTO().toUserDTO(user);
    }

    @DeleteMapping(path = "{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity deleteUser(@PathVariable("userId") Long userId){
        userService.deleteUser(userId);
        return ResponseEntity.status(204).build();
    }

    @PutMapping(path = "{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public UserDTO updateUser( @PathVariable("userId") Long userId,@RequestBody User user){
        User newUser = userService.updateUser(userId, user);
        return new UserDTO().toUserDTO(newUser);
    }

}

@Data
class RoleToUserForm {
    private String email;
    private String roleName;
}

@Data
class ResetPasswordForm {
    private String email;
}
