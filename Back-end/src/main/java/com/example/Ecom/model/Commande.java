package com.example.Ecom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;


@Entity
@Table(name="commandes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Commande {
	
	@Id 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_commande")
	private Long idCommande;

	@JsonIgnore
	@ManyToOne @JoinColumn( name="id_user", nullable=false )
	private User user;
	@JsonIgnore
	@ManyToOne @JoinColumn( name="id_adresse_livraison")
	private Adresse adresse;

	@OneToOne( mappedBy = "commande", cascade = CascadeType.ALL)
    private Paiement paiement;

	@OneToMany( targetEntity=ProduitPanier.class, mappedBy="commande", cascade = CascadeType.ALL)
    private List<ProduitPanier> produitPanier = new ArrayList<>();

	@Column(name="status_commande")
	private String statusCommande = "attente de paiement";

	@Column(name="prix_total")
	private Long prixTotal;

	@Override
	public String toString() {
		return "Commande{" +
				"idCommande=" + idCommande +
				", user=" + user +
				", adresse=" + adresse +
				", paiement=" + paiement +
				", statusCommande='" + statusCommande + '\'' +
				'}';
	}

}