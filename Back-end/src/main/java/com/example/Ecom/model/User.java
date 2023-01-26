package com.example.Ecom.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import javax.persistence.*;


@Entity
@Table(name="users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
	
	@Id 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_user")
	private Long idUser;
	
	@Column(name="nom_user")
	private String nomUser;
	
	private String prenom;
	
	@Column(unique=true)
	private String email;

	@Transient
	char[] possibleCharacters = (new String("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?")).toCharArray();
	@Transient
	String randomStr = RandomStringUtils.random( 15, 0, possibleCharacters.length-1, false, false, possibleCharacters, new SecureRandom() );
	
	private String password = randomStr;


	@ManyToMany(fetch = FetchType.EAGER)
	private List<Role> roles = new ArrayList<>();
	
	@OneToMany( targetEntity=Offre.class, mappedBy="user" )
    private List<Offre> offres = new ArrayList<>();
	
	@OneToMany( targetEntity=Adresse.class, mappedBy="user" )
	private List<Adresse> adresses = new ArrayList<>();
	
	@OneToMany( targetEntity=Commande.class, mappedBy="user" )
    private List<Commande> commandes = new ArrayList<>();
	
	@OneToMany( targetEntity=ProduitPanier.class, mappedBy="user" )
    private List<ProduitPanier> produitPanier = new ArrayList<>();

	public User (String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}

	public User(String nomUser, String prenom, String email, String password) {
		super();
		this.nomUser = nomUser;
		this.prenom = prenom;
		this.email = email;
		this.password = password;
	}

	@Override
	public String toString() {
		return "User{" +
				"idUser=" + idUser +
				", nomUser='" + nomUser + '\'' +
				", prenom='" + prenom + '\'' +
				", email='" + email + '\'' +
				", password='" + password + '\'' +
				'}';
	}
}
