import Spinner from "../../../Components/Spinner";
import Card from "./Card";
import FormFiltre from "./FormFiltre";
import Pagination from "./Pagination";
import Carousel from "./Carousel";
import useAccueil from "./useAccueil";

export default function Dashboard() {
  const { offres, isLoading } = useAccueil();

  return (
    <>
      {isLoading && <Spinner />}
      <Carousel />
      <FormFiltre />
      <div className="row gx-md-5 gy-5 pb-5">
        {offres.length > 0 ? (
          offres.map((offre) => {
            return <Card key={offre.idOffre} offre={offre} />;
          })
        ) : (
          <h2 className="text-center">Aucune offre disponible</h2>
        )}
      </div>

      <Pagination />
    </>
  );
}
