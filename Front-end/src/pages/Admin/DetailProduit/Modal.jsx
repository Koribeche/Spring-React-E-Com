import React from "react";
import Input from "../../../Components/Shared/Input";
import Textarea from "../../../Components/Shared/Textarea";
import TextError from "../../../Components/Shared/TextError";

export default function Modal({
  createCaracteristique,
  caracteristiqueInfo,
  errorInput,
  btn,
  handleChange,
  resetId,
}) {
  return (
    <div
      className="modal fade"
      id="createModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {caracteristiqueInfo.idCaracteristique ? "Update" : "Create"}{" "}
              Caracteristique
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
              <label htmlFor="capacite" className="form-label">
                Capacité{" "}
              </label>
              <select
                className="form-select"
                value={caracteristiqueInfo.capacite}
                onChange={handleChange}
                isError={errorInput.capacite}
                name="capacite"
              >
                <option value="">-</option>
                <option value="128go">128go</option>
                <option value="256go">256go</option>
                <option value="512go">512go</option>
                <option value="1to">1to</option>
              </select>
              <TextError isError={errorInput.capacite} />
            </div>
            <Input
              type="text"
              className="form-control"
              placeholder="Couleur du produit"
              label="Couleur"
              name="color"
              value={caracteristiqueInfo.color}
              onChange={handleChange}
              isError={errorInput.color}
            />
            <Input
              type="number"
              className="form-control"
              placeholder="Prix du produit"
              label="Prix"
              name="prix"
              value={caracteristiqueInfo.prix}
              onChange={handleChange}
              isError={errorInput.prix}
            />
            <Input
              type="number"
              className="form-control"
              placeholder="Quantité disponible"
              label="Quantité"
              name="quantiteDispo"
              value={caracteristiqueInfo.quantiteDispo}
              onChange={handleChange}
              isError={errorInput.quantiteDispo}
            />
            <Textarea
              type="text"
              className="form-control"
              placeholder="description du produit"
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
              onClick={createCaracteristique}
            >
              {caracteristiqueInfo.idCaracteristique ? "Update" : "Create"}
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
