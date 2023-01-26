import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardProduit({
  caract,
  deleteCaracteristique,
  updateForm,
}) {
  const navigate = useNavigate();

  return (
    <div className="col-lg-4 col-sm-6 col-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3">{caract.nomProduit}</h5>
          <p className="card-text">- capacite: {caract.capacite}</p>
          <p className="card-text">- color: {caract.color}</p>
          <p className="card-text">- prix: {caract.prix}</p>
          <p className="card-text">- quantite Dispo: {caract.quantiteDispo}</p>
          <p className="card-text description">
            - Description: {caract.description}
          </p>
          <div className="d-flex justify-content-center flex-column">
            <button
              className="btn w-100 btnTeal"
              onClick={() => navigate(`/admin/produit/${caract.idProduit}`)}
            >
              Voir le produit correspondant
            </button>
            <button
              className="btn w-100 btnTeal border-danger bg-danger mt-2"
              onClick={() => deleteCaracteristique(caract.idCaracteristique)}
            >
              Supprimer
            </button>
            <button
              className="btn w-100 btnTeal border-info bg-info mt-2"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
              onClick={() => updateForm(caract)}
            >
              Update l'produit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
