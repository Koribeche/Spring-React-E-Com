package com.example.Ecom.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name="paiements")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Paiement {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_paiement")
	private Long idPaiement;

	@Column(name="status_paiement")
	private String statusPaiement="pending";
	
	@OneToOne(cascade = CascadeType.ALL)  @JoinColumn( name="id_commande" )
    private Commande commande;

	@Column(name="paiement_intent")
	private String paiementIntent;


	@Override
	public String toString() {
		return "Paiement{" +
				"idPaiement=" + idPaiement +
				", statusPaiement='" + statusPaiement + '\'' +
				'}';
	}

}