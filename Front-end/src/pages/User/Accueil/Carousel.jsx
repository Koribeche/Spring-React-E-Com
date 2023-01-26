import React from "react";
import useAccueil from "./useAccueil";

export default function Carousel() {
  const { offres, filtre } = useAccueil();

  if (filtre.name !== "" || filtre.marque !== "") return <></>;

  return (
    <div className="carousel slide bg-dark mb-5" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target=".carousel"
          data-bs-slide-to="0"
          className="active"
        ></button>
        <button
          type="button"
          data-bs-target=".carousel"
          data-bs-slide-to="1"
        ></button>
        <button
          type="button"
          data-bs-target=".carousel"
          data-bs-slide-to="2"
        ></button>
      </div>

      <div className="carousel-inner">
        {offres.slice(0, 3).map((offre, idx) => {
          return (
            <div
              key={offre.idOffre}
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
            >
              <h5 className="carousel-caption">
                {offre.nomOffre} ( {offre.minPrice} $ )
              </h5>
              <img src={offre.photoOffre} alt="produit recommandé" />
            </div>
          );
        })}
      </div>

      <button
        className="carousel-control-prev"
        data-bs-target=".carousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button
        className="carousel-control-next"
        data-bs-target=".carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}
