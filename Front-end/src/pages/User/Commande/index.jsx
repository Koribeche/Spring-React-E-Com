import Card from "./Card";
import Spinner from "../../../Components/Spinner";
import Error from "../../../Components/Error";
import useCommande from "./useCommande";

export default function Commande() {
  const { listCommande, isLoading, isError } = useCommande();

  console.log(listCommande);

  return (
    <div>
      {isLoading && <Spinner />}
      {isError && <Error msg={isError} />}
      <div className="row mt-2 gy-5 pb-5">
        {listCommande.length === 0 ? (
          <h3 className="text-center p-5 border-top">
            Vous n'avez toujours pas effectuer de commande
          </h3>
        ) : (
          listCommande.map((commande) => {
            return <Card key={commande.idCommande} commande={commande} />;
          })
        )}
      </div>
    </div>
  );
}
