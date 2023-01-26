import Spinner from "../../../Components/Spinner";
import Card from "./Card";
import FormFiltre from "./FormFiltre";
import Modal from "./Modal";
import Pagination from "./Pagination";
import useCommande from "./useCommande";

export default function Dashboard() {
  const {
    commandes,
    isLoading,
    commandeInfo,
    errorInput,
    btn,
    updateCommandes,
    deleteCommande,
    handleChange,
    resetId,
    updateForm,
    rembourser,
  } = useCommande();

  return (
    <>
      {isLoading && <Spinner />}
      <FormFiltre />
      <div className="row gx-md-5 gy-5 pb-5">
        {commandes.map((commande) => {
          return (
            <Card
              key={commande.idCommande}
              commande={commande}
              deleteCommande={deleteCommande}
              updateForm={updateForm}
              rembourser={rembourser}
            />
          );
        })}
      </div>
      <Modal
        commandeInfo={commandeInfo}
        errorInput={errorInput}
        btn={btn}
        updateCommandes={updateCommandes}
        handleChange={handleChange}
        resetId={resetId}
      />
      <Pagination />
    </>
  );
}
