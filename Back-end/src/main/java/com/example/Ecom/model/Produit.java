package com.example.Ecom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;


@Entity	
@Table(name="produits")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Produit {
	
	@Id 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_produit")
	private Long idProduit;
	
	@Column(name="nom_produit")
	private String nomProduit;

	private String description;

	@Column(name="photo_produit")
	private String photoProduit;

	@Column(name="min_price")
	private int minPrice;

	@JsonIgnore
	@ManyToOne @JoinColumn( name="id_offre", nullable=false )
	private Offre offre;
	
	@OneToMany( targetEntity=Caracteristique.class, mappedBy="produit", cascade = CascadeType.ALL )
    private List<Caracteristique> caracteristique = new ArrayList<>();


	@Override
	public String toString() {
		return "Produit{" +
				"idProduit=" + idProduit +
				", nomProduit='" + nomProduit + '\'' +
				", photoProduit='" + photoProduit + '\'' +
				", description='" + description + '\'' +
				'}';
	}
}
