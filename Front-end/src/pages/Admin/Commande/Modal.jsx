import React from "react";
import TextError from "../../../Components/Shared/TextError";
import Input from "../../../Components/Shared/Input";

export default function Modal({
  commandeInfo,
  errorInput,
  btn,
  updateCommandes,
  handleChange,
  resetId,
}) {
  return (
    <div
      className="modal fade"
      id="createModal"
      tabIndex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Update produit
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={resetId}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="statusCommande"> Status </label>
              <select
                className="form-select"
                value={commandeInfo.statusCommande}
                onChange={handleChange}
                name="statusCommande"
              >
                <option value="En préparation de livraison">
                  En préparation de livraison
                </option>
                <option value="En livraison">En livraison</option>
                <option value="Livré">Livré</option>
              </select>
              <TextError isError={errorInput.statusCommande} />
            </div>

            <Input
              type="text"
              className="form-control"
              placeholder="prix de la commande"
              label="Prix Total"
              name="prixTotal"
              value={commandeInfo.prixTotal}
              onChange={handleChange}
              isError={errorInput.prixTotal}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={resetId}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={updateCommandes}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-primary d-none"
              data-bs-dismiss="modal"
              ref={btn}
            >
              Validate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
