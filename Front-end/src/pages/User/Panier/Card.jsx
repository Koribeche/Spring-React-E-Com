import React from "react";

export default function Card({ produit, deleteFromPanier, updateInPanier }) {
  return (
    <>
      <div className="col-md-12 col-sm-6 col-12">
        <div className="card h-100 ">
          <div className="row gx-3 gy-0">
            <div className="col-md-4">
              <img
                src={produit.photoProduit}
                className="img-fluid rounded-start img-card-container"
                alt="ImageProduit"
              />
            </div>
            <div className="col-md-7">
              <div className="card-body h-100 col-lg-8 d-flex flex-column justify-content-around">
                <div>
                  <h5 className="card-title fw-bold title">
                    {produit.nomProduit}
                  </h5>
                  <h5 className="card-title">
                    Prix unité:{" "}
                    <p className="d-inline fw-bold">
                      {produit.caracteristique.prix} $
                    </p>
                  </h5>
                  <h5 className="card-title">
                    Prix à payer:{" "}
                    <p className="d-inline fw-bold">
                      {produit.quantiteAchat * produit.caracteristique.prix} $
                    </p>
                  </h5>
                  <p className="card-title">
                    Quantité Voulu: {produit.quantiteAchat}
                  </p>
                  <p className="card-title">
                    Couleur: {produit.caracteristique.color}
                  </p>
                  <p className="card-title">
                    Capacité: {produit.caracteristique.capacite}
                  </p>
                </div>

                <button
                  className="btn w-100 mt-3 btnTeal"
                  onClick={() =>
                    updateInPanier(
                      `/produit/${produit.caracteristique.idProduit}`
                    )
                  }
                >
                  Update Annonce
                </button>
                <button
                  className="btn d-md-none btn-danger mt-3 w-100"
                  onClick={() => deleteFromPanier(produit.idProduitPanier)}
                >
                  Delete Annonce
                </button>
              </div>
            </div>
            <div className="mt-3 pe-4 d-none d-md-flex col-md-1 d-flex flex-column align-items-end">
              <button
                className="btn btn-danger me-2"
                onClick={() => deleteFromPanier(produit.idProduitPanier)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
