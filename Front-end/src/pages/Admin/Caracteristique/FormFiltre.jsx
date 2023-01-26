import useProduit from "./useProduit";

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
  } = useProduit();

  return (
    <div className="row justify-content-center justify-content-md-around justify-content-lg-center  text-center mb-5">
      <div className="col-md-8 mb-3">
        <div className="input-group">
          <input
            type="text"
            placeholder="Nom de la Caracteristique"
            className="form-control"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <select
            className="form-select"
            value={orderBy + " " + sortBy}
            onChange={(e) => {
              setorderBy(e.target.value.split(" ")[0]);
              setsortBy(e.target.value.split(" ")[1]);
            }}
          >
            <option value="idCaracteristique DESC">Date ( DOWN )</option>
            <option value="idCaracteristique ASC">Date ( UP )</option>
            <option value="prix DESC">Prix ( DOWN )</option>
            <option value="prix ASC">Prix ( UP )</option>
            <option value="nomProduit DESC">Nom ( DOWN )</option>
            <option value="nomProduit ASC">Nom ( UP )</option>
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
