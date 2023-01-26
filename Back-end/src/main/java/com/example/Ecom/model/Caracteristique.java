package com.example.Ecom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;


@Entity
@Table(name="caracteristiques")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Caracteristique{
	
	@Id 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_caracteristique")
	private Long idCaracteristique;
	private String description;
	private String color;
	private String capacite;
	private int prix;
	@Column(name="quantite_dispo")
	private int quantiteDispo;
	@JsonIgnore
	@ManyToOne @JoinColumn( name="id_produit", nullable=false )
	private Produit produit;
	
	@OneToMany( targetEntity= ProduitPanier.class, mappedBy="caracteristique", cascade = CascadeType.ALL )
    private List<ProduitPanier> produitPanier = new ArrayList<>();


	@Override
	public String toString() {
		return "Caracteristique{" +
				"idCaracteristique=" + idCaracteristique +
				", description='" + description + '\'' +
				", color='" + color + '\'' +
				", capacite='" + capacite + '\'' +
				", prix=" + prix +
				", quantiteDispo=" + quantiteDispo +
				'}';
	}
}