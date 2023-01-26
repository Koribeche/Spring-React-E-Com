import Spinner from "../../../Components/Spinner";
import Card from "./Card";
import FormFiltre from "./FormFiltre";
import Modal from "./Modal";
import Pagination from "./Pagination";
import useProduit from "./useProduit";

export default function Dashboard() {
  const {
    produits,
    isLoading,
    produitInfo,
    errorInput,
    btn,
    updateProduits,
    deleteProduit,
    handleChange,
    resetId,
    updateForm,
  } = useProduit();

  return (
    <>
      {isLoading && <Spinner />}
      <FormFiltre />
      <div className="row gx-md-5 gy-5 pb-5">
        {produits.map((produit) => {
          return (
            <Card
              key={produit.id}
              produit={produit}
              deleteProduit={deleteProduit}
              updateForm={updateForm}
            />
          );
        })}
      </div>
      <Modal
        produitInfo={produitInfo}
        errorInput={errorInput}
        btn={btn}
        updateProduits={updateProduits}
        handleChange={handleChange}
        resetId={resetId}
      />
      <Pagination />
    </>
  );
}
