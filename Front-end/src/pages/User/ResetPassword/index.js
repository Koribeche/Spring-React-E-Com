import React from "react";
import useReset from "./useReset";
import Input from "../../../Components/Shared/Input";
import Error from "../../../Components/Error";
import Spinner from "../../../Components/Spinner";
import { FaSignInAlt } from "react-icons/fa";
import Modal from "./Modal";

export default function ResetPassword() {
  const { email, error, btn, setEmail, isLoading, isError, onSubmit } =
    useReset();

  return (
    <>
      <section className="w-100 text-center ">
        <h1>
          <FaSignInAlt /> Reset
        </h1>
      </section>

      {isLoading && <Spinner />}

      {isError && <Error msg={isError} />}

      <section className="form">
        <form onSubmit={onSubmit}>
          <Input
            type="email"
            className="form-control"
            placeholder="Enter your Email address"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isError={error}
          />

          <button type="submit" className="btn w-100 btn-secondary">
            Reset
          </button>
        </form>
        <button
          type="button"
          className="d-none"
          data-bs-toggle="modal"
          data-bs-target="#resetPassword"
          ref={btn}
        >
          Valider le compte
        </button>
        <Modal />
      </section>
    </>
  );
}
