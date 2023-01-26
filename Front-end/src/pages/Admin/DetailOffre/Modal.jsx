import React from "react";
import Input from "../../../Components/Shared/Input";
import Textarea from "../../../Components/Shared/Textarea";

export default function Modal({
  createProduit,
  produitInfo,
  errorInput,
  btn,
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
              {produitInfo.id ? "Update" : "Créer"} un produit
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={resetId}
            ></button>
          </div>
          <div className="modal-body">
            <Input
              type="text"
              className="form-control"
              placeholder="Nom du produit"
              label="Nom"
              name="nomProduit"
              value={produitInfo.nomProduit}
              onChange={handleChange}
              isError={errorInput.nomProduit}
            />
            <Textarea
              type="text"
              className="form-control"
              placeholder="description du produit"
              label="Description"
              name="description"
              value={produitInfo.description}
              onChange={handleChange}
              isError={errorInput.description}
            />
            <Input
              type="file"
              className="form-control"
              placeholder="Photo du produit"
              label="Photo du produit"
              name="file"
              onChange={handleChange}
              isError={errorInput.file}
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
              onClick={createProduit}
            >
              {produitInfo.id ? "Update" : "Créer"}
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
