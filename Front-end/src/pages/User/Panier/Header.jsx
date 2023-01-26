import usePanier from "./usePanier";

export default function Header() {
  const { total } = usePanier();

  return (
    <>
      <section className="d-sm-flex justify-content-between align-items-center">
        <h1 className="mb-3 d-inline-flex col-6 col-sm-auto">
          <span className="border-bottom border-dark m-auto">Votre panier</span>
        </h1>
        <h2 className="mb-3 d-inline-flex col-6 col-sm-auto justify-content-end pe-4">
          <span className="border-bottom border-danger text-danger">
            Total: {total}€
          </span>
        </h2>
        <div className="col-12 text-center col-sm-auto">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Checkout
          </button>
        </div>
      </section>
    </>
  );
}
