import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";

export default function CardOffre() {
  const navigate = useNavigate();

  const style = {
    icon: {
      height: "250px",
      width: "150px",
    },
    container: {
      height: "250px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
  };

  return (
    <div
      className="col-lg-4 col-sm-6 col-12"
      data-bs-toggle="modal"
      data-bs-target="#createModal"
    >
      <div className="card" style={style.card}>
        <div style={style.container}>
          <BsPlusCircle className="card-img-top" style={style.icon} />
        </div>
        <div className="card-body text-center">
          <h2 className="card-title">Créer une Caracteristique</h2>
        </div>
      </div>
    </div>
  );
}
