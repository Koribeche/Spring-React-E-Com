import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../../../Components/Spinner";
import Input from "../../../Components/Shared/Input";
import Error from "../../../Components/Error";
import useRegister from "./useRegister";
import Modal from "./Modal";

function Register() {
  const { userInfo, errorInput, loading, error, btn, onSubmit, handleChange } =
    useRegister();

  return (
    <>
      <section className="w-100 text-center">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      {loading && <Spinner />}
      {error && <Error msg={error} />}

      <section>
        <form onSubmit={onSubmit} className="form">
          <div className="mb-3">
            <div className="input-group">
              <input
                type="text"
                placeholder="Nom"
                className="form-control"
                name="nom"
                value={userInfo.nom}
                onChange={handleChange}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Prenom"
                name="prenom"
                value={userInfo.prenom}
                onChange={handleChange}
              />
            </div>
          </div>

          <Input
            type="email"
            className="form-control"
            placeholder="Your email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            isError={errorInput.email}
          />
          <Input
            type="text"
            className="form-control"
            placeholder="Adresse"
            name="line1"
            value={userInfo.line1}
            onChange={handleChange}
            isError={errorInput.line1}
          />

          <Input
            type="text"
            className="form-control"
            placeholder="Complément d'adresse"
            name="line2"
            value={userInfo.line2}
            onChange={handleChange}
            isError={errorInput.line2}
          />

          <Input
            type="text"
            className="form-control"
            placeholder="Ville"
            name="city"
            value={userInfo.city}
            onChange={handleChange}
            isError={errorInput.city}
          />

          <div className="mb-3">
            <div className="input-group">
              <input
                type="text"
                placeholder="Code postal"
                className="form-control"
                name="codePostal"
                value={userInfo.codePostal}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Pays"
                className="form-control"
                name="pays"
                value={userInfo.pays}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn w-100 btn-secondary">
            Register
          </button>
          <p className="text-center text-muted mt-4 pb-3">
            Have already an account?
            <Link to="/login" className="fw-bold text-body">
              <u> Login here</u>
            </Link>
          </p>
        </form>
        <button
          type="button"
          className="d-none"
          data-bs-toggle="modal"
          data-bs-target="#infoValidation"
          ref={btn}
        >
          Valider le compte
        </button>

        <Modal />
      </section>
    </>
  );
}

export default Register;
