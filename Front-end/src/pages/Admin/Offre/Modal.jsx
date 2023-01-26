import React from "react";
import Input from "../../../Components/Shared/Input";
import Textarea from "../../../Components/Shared/Textarea";

export default function Modal({
  offreInfo,
  errorInput,
  btn,
  createOffre,
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
              {offreInfo.idOffre ? "Update" : "Créer"} offre
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
              placeholder="Nom de l'offre"
              label="Nom"
              name="nomOffre"
              value={offreInfo.nomOffre}
              onChange={handleChange}
              isError={errorInput.nomOffre}
            />
            <Input
              type="text"
              className="form-control"
              placeholder="Marque de l'offre"
              label="Marque"
              name="marque"
              value={offreInfo.marque}
              onChange={handleChange}
              isError={errorInput.marque}
            />
            <Input
              type="text"
              className="form-control"
              placeholder="Catégorie de l'offre"
              label="Catégorie"
              name="categorie"
              value={offreInfo.categorie}
              onChange={handleChange}
              isError={errorInput.categorie}
            />
            <Textarea
              type="text"
              className="form-control"
              placeholder="description de l'offre"
              label="Description"
              name="description"
              value={offreInfo.description}
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
              onClick={createOffre}
            >
              {offreInfo.idOffre ? "Update" : "Créer"}
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
