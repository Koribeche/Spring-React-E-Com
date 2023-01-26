import React from "react";
import useDetailOffre from "./useDetailOffre";
import Spinner from "../../../Components/Spinner";
import Error from "../../../Components/Error";
import CardProduit from "./CardProduit";
import CardAdd from "./CardAdd";
import Modal from "./Modal";

export default function DetailOffre() {
  const {
    offre,
    isLoading,
    isError,
    produitInfo,
    errorInput,
    btn,
    deleteProduit,
    createProduit,
    resetId,
    updateForm,
    handleChange,
  } = useDetailOffre();

  return (
    <div>
      {isLoading && <Spinner />}
      {isError && <Error msg={isError} />}
      <h2 className="mb-4">
        Vous avez {offre.produits.length} offres disponibles:
      </h2>
      <div className="row gx-md-5 gy-5 pb-5">
        <CardAdd />
        {offre.produits.map((produit) => {
          return (
            <CardProduit
              key={produit.id}
              produit={produit}
              deleteProduit={deleteProduit}
              updateForm={updateForm}
            />
          );
        })}
      </div>
      <Modal
        createProduit={createProduit}
        produitInfo={produitInfo}
        errorInput={errorInput}
        btn={btn}
        handleChange={handleChange}
        resetId={resetId}
      />
    </div>
  );
}
