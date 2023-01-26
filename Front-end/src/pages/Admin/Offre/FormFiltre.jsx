import useOffre from "./useOffre";

export default function FormFiltre() {
  const {
    name,
    marque,
    orderBy,
    sortBy,
    searchProduit,
    resetSearch,
    setname,
    setcategory,
    setorderBy,
    setsortBy,
  } = useOffre();

  return (
    <div className="row justify-content-center justify-content-md-around justify-content-lg-center  text-center mb-5">
      <div className="col-md-8 mb-3">
        <div className="input-group">
          <input
            type="text"
            placeholder="Nom du produit"
            className="form-control"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <select
            className="form-select"
            value={marque}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="">Marque</option>
            <option value="apple">apple</option>
            <option value="samsung">Samsung</option>
            <option value="acer">Acer</option>
            <option value="huawei">Huawei</option>
          </select>
          <select
            className="form-select"
            value={orderBy + " " + sortBy}
            onChange={(e) => {
              setorderBy(e.target.value.split(" ")[0]);
              setsortBy(e.target.value.split(" ")[1]);
            }}
          >
            <option value="idOffre DESC">Date ( DOWN )</option>
            <option value="idOffre ASC">Date ( UP )</option>
            <option value="minPrice DESC">Prix ( DOWN )</option>
            <option value="minPrice ASC">Prix ( UP )</option>
            <option value="nomOffre DESC">Nom ( DOWN )</option>
            <option value="nomOffre ASC">Nom ( UP )</option>
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
