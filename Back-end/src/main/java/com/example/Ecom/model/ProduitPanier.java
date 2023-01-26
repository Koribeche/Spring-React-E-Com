package com.example.Ecom.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="produitpaniers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProduitPanier {
	
	@Id 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_produit_panier")
	private Long idProduitPanier;

	@Column(name="quantite_achat")
	private int quantiteAchat;
	@JsonIgnore
	@ManyToOne @JoinColumn( name="id_caracteristique", nullable=false )
	private Caracteristique caracteristique;
	@JsonIgnore
	@ManyToOne @JoinColumn( name="id_user", nullable=false )
	private User user;
	@JsonIgnore
	@ManyToOne @JoinColumn( name="id_commande" )
	private Commande commande;

	@Column(name="status_panier")
	private String statusPanier="en cours";

	@Override
	public String toString() {
		return "ProduitPanier{" +
				"idProduitPanier=" + idProduitPanier +
				", quantiteAchat=" + quantiteAchat +
				", caracteristique=" + caracteristique +
				", statusPanier=" + statusPanier +
				'}';
	}
}
