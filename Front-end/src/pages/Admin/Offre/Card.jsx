import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardOffre({ offre, deleteOffre, updateForm }) {
  const navigate = useNavigate();

  return (
    <div className="col-lg-4 col-sm-6 col-12">
      <div className="card">
        <img
          src={offre.photoOffre}
          className="card-img-top img-card-container"
          alt="ImageOffre"
        />
        <div className="card-body">
          <h5 className="card-title">{offre.nomOffre}</h5>
          <p className="card-text description">{offre.description}</p>
          <div className="d-flex justify-content-center flex-column">
            <button
              className="btn w-100 btnTeal"
              onClick={() =>
                navigate(`/admin/offre/${offre.idOffre}`, { state: offre })
              }
            >
              Voir l'offre
            </button>
            <button
              className="btn w-100 btnTeal border-danger bg-danger mt-2"
              onClick={() => deleteOffre(offre.idOffre)}
            >
              Supprimer l'offre
            </button>
            <button
              className="btn w-100 btnTeal border-info bg-info mt-2"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
              onClick={() => updateForm(offre)}
            >
              Update l'offre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
