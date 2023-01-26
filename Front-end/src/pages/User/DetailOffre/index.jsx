import React from "react";
import useDetailOffre from "./useDetailOffre";
import Spinner from "../../../Components/Spinner";
import Error from "../../../Components/Error";
import CardProduit from "./CardProduit";

export default function DetailOffre() {
  const { offre, isLoading, isError } = useDetailOffre();

  return (
    <div>
      {isLoading && <Spinner />}
      {isError && <Error msg={isError} />}
      <h2 className="mb-4">
        {/* Afficher le nombre de produit dispo */}
        Vous avez {offre?.produits?.length} offres disponibles:
      </h2>
      <div className="row gx-md-5 gy-5 pb-5">
        {offre?.produits.map((produit) => {
          return <CardProduit key={produit.id} produit={produit} />;
        })}
      </div>
    </div>
  );
}
