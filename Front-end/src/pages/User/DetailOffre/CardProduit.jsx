import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardProduit({ produit }) {
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
          <h5 className="card-title title">{produit.nomProduit}</h5>
          <h5 className="card-title fw-bold text-danger">
            à partir de {produit.minPrice} $
          </h5>
          <p className="card-text description">{produit.description}</p>
          <div className="d-flex justify-content-center">
            <button
              className="btn w-100 btnTeal"
              onClick={() => navigate(`/produit/${produit.id}`)}
            >
              Détail du produit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
