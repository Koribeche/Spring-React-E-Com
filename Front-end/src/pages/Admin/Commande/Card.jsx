import React from "react";
import { Link } from "react-router-dom";

export default function CardProduit({
  commande,
  deleteCommande,
  updateForm,
  rembourser,
}) {
  const style = {
    card: { height: "563px" },
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
            <div className="d-flex justify-content-center flex-column">
              <button
                className="btn w-100 btnTeal border-warning bg-warning mt-2"
                data-bs-toggle="modal"
                data-bs-target="#createModal"
                onClick={() => updateForm(commande)}
              >
                Update l'produit
              </button>
              <button
                className="btn w-100 btnTeal border-danger bg-danger mt-2"
                onClick={() => deleteCommande(commande.idCommande)}
              >
                Supprimer
              </button>
            </div>
            <button
              className="btn w-100 btn-info text-white  mt-2"
              disabled={commande.status === "refunded"}
              onClick={() => rembourser(commande.paiement.paiementIntent)}
            >
              rembourser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
