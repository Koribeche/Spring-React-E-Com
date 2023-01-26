import Spinner from "../../../Components/Spinner";
import Card from "./Card";
import FormFiltre from "./FormFiltre";
import Modal from "./Modal";
import Pagination from "./Pagination";
import useProduit from "./useProduit";

export default function Dashboard() {
  const {
    caracteristiques,
    isLoading,
    caracteristiqueInfo,
    errorInput,
    btn,
    updateCaracteristiques,
    deleteCaracteristique,
    handleChange,
    resetId,
    updateForm,
  } = useProduit();

  return (
    <>
      {isLoading && <Spinner />}
      <FormFiltre />
      <div className="row gx-md-5 gy-5 pb-5">
        {caracteristiques.map((caract) => {
          return (
            <Card
              key={caract.idCaracteristique}
              caract={caract}
              deleteCaracteristique={deleteCaracteristique}
              updateForm={updateForm}
            />
          );
        })}
      </div>
      <Modal
        caracteristiqueInfo={caracteristiqueInfo}
        errorInput={errorInput}
        btn={btn}
        updateCaracteristiques={updateCaracteristiques}
        handleChange={handleChange}
        resetId={resetId}
      />
      <Pagination />
    </>
  );
}
