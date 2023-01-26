import React from "react";

export default function CardCaracteristique({
  caracteristique,
  deleteCaracteristique,
  updateForm,
}) {
  return (
    <div className="col-lg-4 col-sm-6 col-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-bold">
            - Capacité: {caracteristique.capacite}
          </h5>
          <h5 className="card-title fw-bold">
            - Prix: {caracteristique.prix} $
          </h5>
          <h5 className="card-title fw-bold">
            - Couleur: {caracteristique.color}
          </h5>
          <h5 className="card-title fw-bold">
            - Quantité dispo: {caracteristique.quantiteDispo}
          </h5>
          <div className="card-text description"></div>
          <div className="title"></div>
          <div className="d-flex flex-column justify-content-center">
            <button
              className="btn w-100 btnTeal border-danger bg-danger mt-2"
              onClick={() =>
                deleteCaracteristique(caracteristique.idCaracteristique)
              }
            >
              Supprimer
            </button>
            <button
              className="btn w-100 btnTeal border-info bg-info mt-2"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
              onClick={() => updateForm(caracteristique)}
            >
              Update le caracteristique
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
