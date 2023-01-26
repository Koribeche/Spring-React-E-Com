import Spinner from "../../../Components/Spinner";
import Error from "../../../Components/Error";
import useDetail from "./useDetail";
import CardProduit from "./CardProduit";
import CardAdd from "./CardAdd";
import CardCaracteristique from "./CardCaracteristique";
import Modal from "./Modal";

export default function DetailProduit() {
  const {
    caracteristiqueInfo,
    errorInput,
    qteDispo,
    prix,
    produit,
    btn,
    isError,
    isLoading,
    setcap,
    setcolor,
    handleChange,
    createCaracteristique,
    deleteCaracteristique,
    updateForm,
    resetId,
  } = useDetail();

  return (
    <>
      {isError && <Error msg={isError} />}
      {isLoading && <Spinner />}
      <CardProduit
        qteDispo={qteDispo}
        prix={prix}
        produit={produit}
        setcap={setcap}
        setcolor={setcolor}
      />
      <div className="row gx-md-5 gy-5 pb-5">
        <CardAdd />
        {produit?.caracteristiques?.map((caracteristique) => (
          <CardCaracteristique
            caracteristique={caracteristique}
            deleteCaracteristique={deleteCaracteristique}
            updateForm={updateForm}
          />
        ))}
      </div>
      <Modal
        btn={btn}
        caracteristiqueInfo={caracteristiqueInfo}
        errorInput={errorInput}
        handleChange={handleChange}
        createCaracteristique={createCaracteristique}
        resetId={resetId}
      />
    </>
  );
}
