import Card from "./Card";
import Header from "./Header";
import Modal from "./Modal";
import usePanier from "./usePanier";
import Spinner from "../../../Components/Spinner";
import Error from "../../../Components/Error";

export default function Panier() {
  const {
    isLoading,
    isError,
    btn,
    userInfo,
    errorInput,
    listPanier,
    handleChange,
    confirmLogin,
    deleteFromPanier,
    updateInPanier,
  } = usePanier();

  return (
    <div>
      <Header />
      {isLoading && <Spinner />}
      {isError && <Error msg={isError} />}
      <div className="row mt-2 gy-5 pb-5">
        {listPanier.length === 0 ? (
          <h3 className="text-center p-5 border-top">Votre panier est vide</h3>
        ) : (
          listPanier
            .filter((produit) => produit.statusPanier === "en cours")
            .map((produit) => {
              return (
                <Card
                  key={produit.idProduitPanier}
                  produit={produit}
                  deleteFromPanier={deleteFromPanier}
                  updateInPanier={updateInPanier}
                />
              );
            })
        )}
      </div>
      <Modal
        btn={btn}
        userInfo={userInfo}
        errorInput={errorInput}
        handleChange={handleChange}
        confirmLogin={confirmLogin}
        isError={isError}
      />
    </div>
  );
}
