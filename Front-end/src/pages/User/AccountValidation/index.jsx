import React from "react";
import useValidation from "./useValidation";
import Input from "../../../Components/Shared/Input";
import Error from "../../../Components/Error";
import Spinner from "../../../Components/Spinner";
import { FaSignInAlt } from "react-icons/fa";

export default function AccountValidation() {
  const {
    userInfo,
    inputError,
    isLoading,
    isError,
    errorInput,
    handleChange,
    onSubmit,
  } = useValidation();

  return (
    <>
      <section className="w-100 text-center ">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Validate your password</p>
      </section>

      {isLoading && <Spinner />}

      {isError && <Error msg={isError} />}

      <section className="form">
        <form onSubmit={onSubmit}>
          <Input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            label="Password"
            name="oldPassword"
            value={userInfo.oldPassword}
            onChange={handleChange}
            isError={errorInput.oldPassword}
          />
          <Input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            label="new password"
            name="newPassword"
            value={userInfo.newPassword}
            onChange={handleChange}
            isError={errorInput.newPassword}
          />

          <button type="submit" className="btn w-100 btn-secondary">
            Change
          </button>
        </form>
      </section>
    </>
  );
}
