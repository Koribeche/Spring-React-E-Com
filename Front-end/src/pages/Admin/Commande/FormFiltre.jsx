import useCommande from "./useCommande";

export default function FormFiltre() {
  const {
    name,
    orderBy,
    sortBy,
    searchProduit,
    resetSearch,
    setname,
    setorderBy,
    setsortBy,
  } = useCommande();

  return (
    <div className="row justify-content-center justify-content-md-around justify-content-lg-center  text-center mb-5">
      <div className="col-md-8 mb-3">
        <div className="input-group">
          <select
            className="form-select"
            value={name}
            onChange={(e) => setname(e.target.value)}
          >
            <option value="">Status</option>
            <option value="En préparation de livraison">Préparation</option>
            <option value="En livraison">En livraison </option>
            <option value="Livré">Livré</option>
          </select>
          <select
            className="form-select"
            value={orderBy + " " + sortBy}
            onChange={(e) => {
              setorderBy(e.target.value.split(" ")[0]);
              setsortBy(e.target.value.split(" ")[1]);
            }}
          >
            <option value="idCommande DESC">Date ( DOWN )</option>
            <option value="idCommande ASC">Date ( UP )</option>
            <option value="prixTotal DESC">Prix ( DOWN )</option>
            <option value="prixTotal ASC">Prix ( UP )</option>
          </select>
        </div>
      </div>
      <div className="col-md-1 mb-3 me-md-3">
        <button
          onClick={searchProduit}
          className="btn btn-primary col-12 col-md-auto"
        >
          Search
        </button>
      </div>
      <div className="col-md-1">
        <button
          onClick={resetSearch}
          className="btn btnPurple col-12 col-md-auto"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
