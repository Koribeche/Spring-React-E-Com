import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardProduit({ produit, deleteProduit, updateForm }) {
  const navigate = useNavigate();

  return (
    <div className="col-lg-4 col-sm-6 col-12">
      <div className="card">
        <img
          src={produit.photoProduit}
          className="card-img-top img-card-container"
          alt="ImageProduit"
        />
        <div className="card-body">
          <h5 className="card-title">{produit.nomProduit}</h5>
          <p className="card-text description">{produit.description}</p>
          <div className="d-flex justify-content-center flex-column">
            <button
              className="btn w-100 btnTeal"
              onClick={() => navigate(`/admin/produit/${produit.id}`)}
            >
              Voir le produit
            </button>
            <button
              className="btn w-100 btnTeal border-danger bg-danger mt-2"
              onClick={() => deleteProduit(produit.id)}
            >
              Supprimer l'produit
            </button>
            <button
              className="btn w-100 btnTeal border-info bg-info mt-2"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
              onClick={() => updateForm(produit)}
            >
              Update l'produit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
