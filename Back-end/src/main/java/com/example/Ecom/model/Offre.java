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


@Entity @Table(name="offres")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Offre {
	
	@Id 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_offre")
	private Long idOffre;

	@Column(name="nom_offre")
	private String nomOffre;
	
	@Column(name="photo_offre")
	private String photoOffre;

	private String description;
	
	private String categorie;
	private String marque;

	@Column(name="min_price")
	private int minPrice;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="creation_time", updatable=false)
	private Date creationTime = new Date();

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="modification_time")
	private Date modificationTime = new Date();

	@JsonIgnore
	@ManyToOne @JoinColumn( name="id_user" )
	private User user;
	
	
	@OneToMany( targetEntity=Produit.class, mappedBy="offre",  cascade = CascadeType.ALL )
    private List<Produit> produits = new ArrayList<>();

	@Override
	public String toString() {
		return "Offre{" +
				"idOffre=" + idOffre +
				", nomOffre='" + nomOffre + '\'' +
				", photoOffre='" + photoOffre + '\'' +
				", categorie='" + categorie + '\'' +
				", marque='" + marque + '\'' +
				", minPrice='" + minPrice + '\'' +
				", description='" + description + '\'' +
				", creationTime=" + creationTime +
				", modificationTime=" + modificationTime +
				", user=" + user +
				'}';
	}

}