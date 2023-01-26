import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardOffre({ offre }) {
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
          <h5 className="card-title title">{offre.nomOffre}</h5>
          <h5 className="card-title fw-bold text-danger">
            à partir de {offre.minPrice} $
          </h5>
          <p className="card-text description">{offre.description}</p>
          <div className="d-flex justify-content-center">
            <button
              className="btn w-100 btnTeal"
              onClick={() =>
                navigate(`/offre/${offre.idOffre}`, { state: offre })
              }
            >
              Voir l'offre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
