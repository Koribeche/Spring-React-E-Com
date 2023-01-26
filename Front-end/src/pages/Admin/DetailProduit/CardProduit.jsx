import React from "react";

export default function CardProduit({
  qteDispo,
  prix,
  produit,
  setcap,
  setcolor,
}) {
  return (
    <>
      {produit && (
        <div className="card mb-5 h-100">
          <div className="row gx-3 gy-0">
            <div className="col-md-4 my-3">
              <img
                src={produit?.photoProduit}
                className="img-fluid rounded-start w-100 h-100"
                alt="ImageProduit"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body h-100 col-md-8 col-12 d-flex flex-column justify-content-around">
                <div>
                  <h5 className="card-title fw-bold mb-3">
                    {produit?.nomProduit}
                  </h5>
                  <h5 className="card-title">Prix: {prix}</h5>
                  <h5 className="card-title">
                    Quantité Disponible: {qteDispo}
                  </h5>
                </div>
                <div>
                  <select
                    className="form-select w-25 mb-3"
                    onClick={(e) => setcolor(e.target.value)}
                  >
                    <option value="">-</option>
                    {produit?.caracteristiques.map((car) => {
                      return (
                        <option key={car.idCaracteristique} value={car.color}>
                          {car.color}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    className="form-select w-25 "
                    onClick={(e) => setcap(e.target.value)}
                  >
                    <option value="">-</option>
                    {produit?.caracteristiques
                      .sort(
                        (a, b) =>
                          a.capacite.match(/\d+/g)[0] -
                          b.capacite.match(/\d+/g)[0]
                      )
                      .map((car) => {
                        return (
                          <option
                            key={car.idCaracteristique}
                            value={car.capacite}
                          >
                            {car.capacite}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
