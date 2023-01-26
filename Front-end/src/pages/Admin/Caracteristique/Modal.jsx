import React from "react";
import Input from "../../../Components/Shared/Input";
import Textarea from "../../../Components/Shared/Textarea";

export default function Modal({
  caracteristiqueInfo,
  errorInput,
  btn,
  updateCaracteristiques,
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
            <Input
              type="text"
              className="form-control"
              placeholder="Couleur"
              label="Couleur"
              name="color"
              value={caracteristiqueInfo.color}
              onChange={handleChange}
              isError={errorInput.color}
            />
            <Input
              type="text"
              className="form-control"
              placeholder="Capacite"
              label="Capacite"
              name="capacite"
              value={caracteristiqueInfo.capacite}
              onChange={handleChange}
              isError={errorInput.capacite}
            />
            <Input
              type="text"
              className="form-control"
              placeholder="quantite Disponible"
              label="quantite Disponible"
              name="quantiteDispo"
              value={caracteristiqueInfo.quantiteDispo}
              onChange={handleChange}
              isError={errorInput.quantiteDispo}
            />
            <Input
              type="text"
              className="form-control"
              placeholder="Prix"
              label="Prix"
              name="prix"
              value={caracteristiqueInfo.prix}
              onChange={handleChange}
              isError={errorInput.prix}
            />
            <Textarea
              type="text"
              className="form-control"
              placeholder="description de l'produit"
              label="Description"
              name="description"
              value={caracteristiqueInfo.description}
              onChange={handleChange}
              isError={errorInput.description}
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
              onClick={updateCaracteristiques}
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
