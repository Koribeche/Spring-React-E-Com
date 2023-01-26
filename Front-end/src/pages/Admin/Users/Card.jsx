import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardProduit({ user, deleteUser, updateForm }) {
  const navigate = useNavigate();

  return (
    <div className="col-lg-4 col-sm-6 col-12">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3">
            {user.nomUser} {user.prenom}
          </h5>
          <p className="card-text">- email: {user.email}</p>
          <p className="card-text description">
            - Adresse:{" "}
            {user.adresses[0] && (
              <>
                {user.adresses[0]?.line1}, {user.adresses[0]?.city},{" "}
                {user.adresses[0]?.codePostal},{user.adresses[0]?.pays}
              </>
            )}
          </p>
          <div className="d-flex justify-content-center flex-column">
            <button
              className="btn w-100 btnTeal mt-2"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
              onClick={() => updateForm(user)}
            >
              Update user
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
