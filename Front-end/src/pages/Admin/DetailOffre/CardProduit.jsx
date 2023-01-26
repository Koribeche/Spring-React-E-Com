import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardProduit({ produit, deleteProduit, updateForm }) {
  const navigate = useNavigate();

  console.log(produit);

  return (
    <div className="col-lg-4 col-sm-6 col-12">
      <div className="card">
        <img
          src={produit.photoProduit}
          className="card-img-top img-card-container"
          alt="ImageProduit"
        />
        <div className="card-body">
          <h5 className="card-title title">{produit.nomProduit}</h5>
          <h5 className="card-title fw-bold text-danger">
            à partir de {produit.minPrice} $
          </h5>
          <p className="card-text description">{produit.description}</p>
          <div className="d-flex flex-column justify-content-center">
            <button
              className="btn w-100 btnTeal"
              onClick={() => navigate(`/admin/produit/${produit.id}`)}
            >
              Détail du produit
            </button>
            <button
              className="btn w-100 btnTeal border-danger bg-danger mt-2"
              onClick={() => deleteProduit(produit.id)}
            >
              Supprimer le produit
            </button>
            <button
              className="btn w-100 btnTeal border-info bg-info mt-2"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
              onClick={() => updateForm(produit)}
            >
              Update le produit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
