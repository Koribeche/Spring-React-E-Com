import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../../../Components/Spinner";
import Error from "../../../Components/Error";
import Input from "../../../Components/Shared/Input";
import useLoginAdmin from "./useLoginAdmin";

function LoginAdmin() {
  const { userInfo, errorInput, isLoading, isError, handleChange, onSubmit } =
    useLoginAdmin();

  return (
    <>
      <section className="w-100 text-center ">
        <h1>
          <FaSignInAlt /> Login Admin
        </h1>
        <p>Login and start working</p>
      </section>

      {isLoading && <Spinner />}

      {isError && <Error msg={isError} />}

      <section className="form">
        <form onSubmit={onSubmit}>
          <Input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            label="Email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            isError={errorInput.email}
          />
          <Input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            label="Password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            isError={errorInput.password}
          />

          <button type="submit" className="btn w-100 btn-secondary">
            Login
          </button>

          <p className="text-center text-muted mt-4 pb-3">
            Vous n'avez pas le role d'admin ?
            <Link to="/register" className="fw-bold text-body">
              <u> Demander l'accès ici</u>
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default LoginAdmin;
