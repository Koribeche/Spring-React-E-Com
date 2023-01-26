import Spinner from "../../../Components/Spinner";
import Card from "./Card";
import CardAdd from "./CardAdd";
import FormFiltre from "./FormFiltre";
import Modal from "./Modal";
import Pagination from "./Pagination";
import useOffre from "./useOffre";

export default function Dashboard() {
  const {
    offres,
    isLoading,
    offreInfo,
    errorInput,
    btn,
    createOffre,
    deleteOffre,
    handleChange,
    resetId,
    updateForm,
  } = useOffre();

  return (
    <>
      {isLoading && <Spinner />}
      <FormFiltre />
      <div className="row gx-md-5 gy-5 pb-5">
        <CardAdd />
        {offres.map((offre) => {
          return (
            <Card
              key={offre.idOffre}
              offre={offre}
              deleteOffre={deleteOffre}
              updateForm={updateForm}
            />
          );
        })}
      </div>
      <Modal
        offreInfo={offreInfo}
        errorInput={errorInput}
        btn={btn}
        createOffre={createOffre}
        handleChange={handleChange}
        resetId={resetId}
      />
      <Pagination />
    </>
  );
}
