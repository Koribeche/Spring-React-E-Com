package com.example.Ecom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name="adresses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Adresse {
	
	@Id 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_adresse")
	private Long idAdresse;

	private String line1;

	private String line2;

	private String city;
	private String pays;
	
	@Column(name="code_postal")
	private String codePostal;
	@JsonIgnore
	@ManyToOne @JoinColumn( name="id_user", nullable=false )
	private User user;

	@OneToMany( targetEntity= Commande.class, mappedBy="adresse" )
    private List<Commande> commandes = new ArrayList<>();


	@Override
	public String toString() {
		return "Adresse{" +
				"idAdresse=" + idAdresse +
				", line1='" + line1 + '\'' +
				", line2=" + line2 +
				", city='" + city + '\'' +
				", pays='" + pays + '\'' +
				", codePostal=" + codePostal +
				", user=" + user +
				'}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Adresse adresse = (Adresse) o;
		return Objects.equals(line1, adresse.line1) && Objects.equals(line2, adresse.line2) && Objects.equals(city, adresse.city) && Objects.equals(pays, adresse.pays) && Objects.equals(codePostal, adresse.codePostal) && Objects.equals(user, adresse.user);
	}

	@Override
	public int hashCode() {
		return Objects.hash(line1, line2, city, pays, codePostal);
	}
}