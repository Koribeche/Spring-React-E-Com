import Spinner from "../../../Components/Spinner";
import Error from "../../../Components/Error";
import useDetail from "./useDetail";
import CardProduit from "./CardProduit";

export default function DetailProduit() {
  const {
    qteDispo,
    prix,
    produit,
    qteAchat,
    setqteAchat,
    addToPanier,
    setcap,
    setcolor,
    isError,
    isLoading,
  } = useDetail();

  const style = {
    input: {
      padding: " 0.375rem 0.75rem",
      border: "1px solid #ced4da",
      borderRadius: "0.25rem",
      transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
    },
  };

  return (
    <>
      {isError && <Error msg={isError} />}
      {isLoading && <Spinner />}
      {produit && (
        <div className="card mb-3 h-100">
          <div className="row gx-3 gy-0">
            <div className="col-md-4 my-3">
              <img
                src={produit?.photoProduit}
                className="img-fluid rounded-start w-100 h-100"
                alt="ImageProduit"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body h-100 col-md-8 col-12 d-flex flex-column justify-content-around">
                <div>
                  <h5 className="card-title fw-bold mb-3">
                    {produit?.nomProduit}
                  </h5>
                  <h5 className="card-title">Prix: {prix}</h5>
                  <h5 className="card-title">
                    Quantité Disponible: {qteDispo}
                  </h5>
                </div>
                <select
                  className="form-select w-25  mb-3"
                  onClick={(e) => setcolor(e.target.value)}
                >
                  <option value="">-</option>
                  {produit?.caracteristiques.map((car) => {
                    return (
                      <option key={car.idCaracteristique} value={car.color}>
                        {car.color}
                      </option>
                    );
                  })}
                </select>
                <select
                  className="form-select w-25 "
                  onClick={(e) => setcap(e.target.value)}
                >
                  <option value="">-</option>
                  {produit?.caracteristiques
                    .sort(
                      (a, b) =>
                        a.capacite.match(/\d+/g)[0] -
                        b.capacite.match(/\d+/g)[0]
                    )
                    .map((car) => {
                      return (
                        <option
                          key={car.idCaracteristique}
                          value={car.capacite}
                        >
                          {car.capacite}
                        </option>
                      );
                    })}
                </select>
                <div>
                  <div className="mb-3 mt-3">
                    <button
                      className="btn btn-danger me-2"
                      disabled={qteAchat <= 1}
                      onClick={() =>
                        setqteAchat((qteAchat) => parseInt(qteAchat) - 1)
                      }
                    >
                      -
                    </button>
                    <div className="d-inline col-lg-6 col-4">
                      <input
                        type="number"
                        className="d-inline col-lg-6 col-4"
                        style={style.input}
                        value={qteAchat}
                        onChange={(e) => setqteAchat(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-success ms-2"
                      disabled={qteAchat >= qteDispo}
                      onClick={() =>
                        setqteAchat((qteAchat) => parseInt(qteAchat) + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn col-lg-8 col-md-8 col-12 btnTeal"
                    disabled={
                      qteAchat > qteDispo || qteAchat < 1 || isNaN(prix)
                    }
                    onClick={() => addToPanier()}
                  >
                    Acheter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
