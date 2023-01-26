import React from "react";
import Input from "../../../Components/Shared/Input";
import { useSelector } from "react-redux";
import Error from "../../../Components/Error";

export default function Modal({
  btn,
  userInfo,
  errorInput,
  handleChange,
  confirmLogin,
  isError,
}) {
  const user = useSelector((state) => state.auth);

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      {isError && <Error msg={isError} />}
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Validate login
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
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
          </div>
          <div>
            <h4> Adresse de livraison </h4>
            {user.adresses.map((adresse) => {
              return (
                <div className="ms-1 mb-3">
                  <input type="radio" id={adresse.idAdresse} name="adresse" />
                  <label htmlFor={adresse.idAdresse} className="ms-2">
                    {adresse.line1}, {adresse.city}
                  </label>
                </div>
              );
            })}
            <div className="ms-1 mb-3">
              <input
                type="radio"
                id="newAdresse"
                name="adresse"
                defaultChecked
              />
              <label htmlFor="newAdresse" className="ms-2">
                Nouvelle Adresse
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary d-none"
              data-bs-dismiss="modal"
              ref={btn}
            >
              Validate
            </button>
            <button
              onClick={() => confirmLogin()}
              type="button"
              className="btn btn-primary"
            >
              Validate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
