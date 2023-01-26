import React from "react";
import useCommande from "./useCommande";
import { Link } from "react-router-dom";

export default function CardAnnonce({ commande }) {
  const { rembourser } = useCommande();

  const style = {
    card: { height: "425px" },
    pic: {
      height: "75px",
      width: "75px",
    },
  };

  return (
    <div className="col-lg-4 col-sm-6 col-12">
      <div className="card" style={style.card}>
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title mb-3">Commande :</h5>
            {commande.produitPanier.map((produit) => {
              return (
                <Link
                  to={`/produit/${produit.caracteristique.idProduit}`}
                  key={produit.idProduitPanier}
                >
                  <h5 className="card-subtitle text-muted title mb-4 fs-6">
                    <img src={produit.photoProduit} style={style.pic} />{" "}
                    {produit.nomProduit} ({produit.caracteristique.prix} €) x
                    {produit.quantiteAchat}
                  </h5>
                </Link>
              );
            })}
            <h5 className={`card-title`}>
              - Status:{" "}
              <p
                className={`d-inline fw-bold ${
                  commande.paiement.statusPaiement === "Paied"
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {commande.paiement.statusPaiement}
              </p>
            </h5>

            <h5 className={"card-title"}>
              - Etat:{" "}
              <p
                className={`d-inline fw-bold fs-4 ${
                  commande.statusCommande === "En préparation de livraison"
                    ? "text-warning"
                    : "text-success"
                }`}
              >
                {commande.statusCommande}
              </p>
            </h5>
          </div>

          <div>
            <h5 className="card-title fw-bold text-info text-end">
              Total: {commande.prixTotal} €
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
