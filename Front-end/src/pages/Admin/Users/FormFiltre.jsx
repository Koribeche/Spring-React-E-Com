import useProduit from "./useUsers";

export default function FormFiltre() {
  const {
    name,
    role,
    orderBy,
    sortBy,
    searchProduit,
    resetSearch,
    setname,
    setrole,
    setorderBy,
    setsortBy,
  } = useProduit();

  return (
    <div className="row justify-content-center justify-content-md-around justify-content-lg-center  text-center mb-5">
      <div className="col-md-8 mb-3">
        <div className="input-group">
          <input
            type="text"
            placeholder="nom | prenom | email"
            className="form-control"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <select
            className="form-select"
            value={role}
            onChange={(e) => setrole(e.target.value)}
          >
            <option value="">Roles</option>
            <option value="ROLE_USER">User</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
          <select
            className="form-select"
            value={orderBy + " " + sortBy}
            onChange={(e) => {
              setorderBy(e.target.value.split(" ")[0]);
              setsortBy(e.target.value.split(" ")[1]);
            }}
          >
            <option value="idUser DESC">Date ( DOWN )</option>
            <option value="idUser ASC">Date ( UP )</option>
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
